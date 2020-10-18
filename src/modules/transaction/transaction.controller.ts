import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto';

@Controller('transaction')
export class TransactionController {

  constructor(private transactionService: TransactionService) {
  }

  @Post('')
  async saveTransaction(@Body() transactionDto: TransactionDto): Promise<TransactionDto> {
    return await this.transactionService.saveTransaction(transactionDto);
  }

}
