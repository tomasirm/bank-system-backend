import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionTypesService } from './transaction-types.service';


@Controller('transaction-types')
export class TransactionTypesController {

  constructor(private transactionTypesService: TransactionTypesService) {
  }

  @Get('populate')
  async saveTransaction(): Promise<any> {
    return await this.transactionTypesService.populate();
  }

}

