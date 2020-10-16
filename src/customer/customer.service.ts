import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDto } from './infraestructure/customer.dto';
import { AccountDto } from '../account/account.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(CustomerEntity) private readonly customerEntityRepository: Repository<CustomerEntity>) { }

  public async saveCustomer(customerEntity: CustomerEntity, customerDto: CustomerDto): Promise<CustomerDto> {
    console.log(customerDto)
    const customerFind : CustomerDto = await this.getCustomer(customerDto.dni);
    if(customerFind && customerFind.id) {
      throw new HttpException('Customer already exists', HttpStatus.CONFLICT);
    }
    return this.customerEntityRepository.save(CustomerDto.from(customerDto).toEntity())
      .then(e => CustomerDto.fromEntity(e));
  }

  public async getCustomer(dni: string): Promise<CustomerDto> {

    const customer = await this.customerEntityRepository.findOne({dni: dni}, { relations: ['accountEntity'] });
    if(!customer){
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    const customerDto: CustomerDto =  CustomerDto.fromEntity(customer)
    if(customer.accountEntity){
     customerDto.account = AccountDto.fromEntity(await customer.accountEntity);
    }
    return customerDto;
  }

  public async getAllCustomers(): Promise<CustomerDto[]> {
    return await this.customerEntityRepository.find({ relations: ['accountEntity'] })
      .then(customers => customers.map(customer =>  CustomerDto.fromEntity(customer)));
  }


}
