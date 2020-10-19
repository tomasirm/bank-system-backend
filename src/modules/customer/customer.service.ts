import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerDto } from './customer.dto';
import { CustomerEntity } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/login.dto';

@Injectable()
export class CustomerService {
  constructor( @InjectRepository(CustomerEntity) private readonly customerEntityRepository: Repository<CustomerEntity>,
               private readonly authService: AuthService) {
  }


  public async saveCustomer(customerDto: CustomerDto): Promise<CustomerDto> {
    let customer = await this.findCustomerByDni(customerDto.dni);
    if (customer && customer.id) {
      throw new HttpException('Cliente ya existe', HttpStatus.CONFLICT);
    }
    customer = new CustomerEntity();

    customerDto.password = await this.authService.hashPassword(customerDto.password);
    customer = await this.customerEntityRepository.save(CustomerDto.from(customerDto).toEntity());
    return CustomerDto.fromEntity(customer);
  }

  public async getAllCustomers(): Promise<CustomerDto[]> {
    return await this.customerEntityRepository.find()
      .then(customers => customers.map(customer => CustomerDto.fromEntity(customer)));
  }

  public async findCustomerByDni(dni: string): Promise<CustomerEntity>{
    return await this.customerEntityRepository.findOne({ dni: dni });
  }

  public async getCustomerByDni(dni: string): Promise<CustomerDto>{
    const customer = await this.findCustomerByDni(dni);
    if (customer && customer.id) {
      throw new HttpException('Cliente no encontrado', HttpStatus.CONFLICT);
    }
    return CustomerDto.from(customer);
  }

  public async getBalance(dni: string){
    const customer = await this.findCustomerByDni(dni);
    if (!customer || !customer.id) {
      throw new HttpException('Cliente no encontrado', HttpStatus.CONFLICT);
    }
    return customer.balance;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const customer = await this.findCustomerByDni(loginDto.dni);
    if (!customer || !customer.id) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }
    const passwordMatch = await this.authService.comparePasswords(loginDto.password, customer.password);
    if(!passwordMatch) {
      throw new HttpException('Las credenciales no coinciden', HttpStatus.NOT_FOUND);
    }
    const payload = { username: customer.email };
    return {
      customerDto: CustomerDto.fromEntity(customer),
      access_token: this.authService.generateJWT(payload),
    };


  }


}
