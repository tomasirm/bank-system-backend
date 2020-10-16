import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { CustomerEntity } from '../customer/customer.entity';
import { CustomerDto } from '../customer/infraestructure/customer.dto';

@Controller('transaction-types')
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {
  }

  @Post('')
  async saveCustomer(customerEntity: CustomerEntity, @Body() customerDto: CustomerDto): Promise<CustomerDto> {
    return await this.customerService.saveCustomer(customerEntity, customerDto);
  }


}

