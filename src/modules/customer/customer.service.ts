import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerDto } from './customer.dto';
import { CustomerEntity } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor( @InjectRepository(CustomerEntity) private readonly customerEntityRepository: Repository<CustomerEntity>) {
  }

  public async saveCustomer(customerDto: CustomerDto): Promise<CustomerDto> {
    let customer = await this.findCustomerByDni(customerDto.dni);
    if (customer && customer.id) {
      throw new HttpException('Customer already exists', HttpStatus.CONFLICT);
    }
    customer = await this.customerEntityRepository.save(CustomerDto.from(customerDto).toEntity());
    return CustomerDto.fromEntity(customer);
  }

  public async getAllCustomers(): Promise<CustomerDto[]> {
    return await this.customerEntityRepository.find({ relations: ['accountEntity'] })
      .then(customers => customers.map(customer => CustomerDto.fromEntity(customer)));
  }


  public async findCustomerByEmailAndPass(email: string, password: string){
    return  await this.customerEntityRepository.findOne({email: email, password: password});
  }

  public async findCustomerByDni(dni: string): Promise<CustomerEntity>{
    return await this.customerEntityRepository.findOne({ dni: dni }, { relations: ['accountEntity'] });
  }

  public async getCustomerByDni(dni: string): Promise<CustomerDto>{
    const customer = await this.findCustomerByDni(dni);
    if (customer && customer.id) {
      throw new HttpException('Customer not found', HttpStatus.CONFLICT);
    }
    return CustomerDto.from(customer);
  }

  public async getCustomerByEmailAndPass(email: string, password: string){
    const customer = await this.findCustomerByEmailAndPass(email, password);
    return CustomerDto.from(customer);
  }


}
