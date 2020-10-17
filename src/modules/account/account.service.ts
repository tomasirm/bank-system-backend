import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { CustomerService } from '../customer/customer.service';
import { CustomerEntity } from '../customer/customer.entity';
import { AccountDto } from './account.dto';
import { CustomerDto } from '../customer/customer.dto';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(AccountEntity) private readonly accountEntityRepository: Repository<AccountEntity>,
              @InjectRepository(CustomerEntity) private readonly customerEntityRepository: Repository<CustomerEntity>,
              private readonly customerService: CustomerService) {
  }

  public async saveAccount(dni: string): Promise<AccountDto> {
    const customerFind = await this.customerEntityRepository.findOne({ dni: dni });
    if (!customerFind) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    console.log(CustomerDto.fromEntity(customerFind));
    if (await customerFind.accountEntity) {
      throw new HttpException('Customer already have an account', HttpStatus.CONFLICT);
    }
    const account = await this.accountEntityRepository.save(new AccountEntity());
    customerFind.accountEntity = Promise.resolve(account);
    await this.customerEntityRepository.save(customerFind);

    return AccountDto.fromEntity(account);
  }

  public async getAccount(dni: string): Promise<AccountDto> {
    const customerFind = await this.customerEntityRepository.findOne({ dni: dni });
    if (!customerFind) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    const account = await customerFind.accountEntity;
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    return AccountDto.fromEntity(account);
  }


}
