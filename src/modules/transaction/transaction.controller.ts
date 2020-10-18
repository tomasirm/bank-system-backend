import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto';

@Controller('transaction')
export class TransactionController {

  constructor(private transactionService: TransactionService) {
  }

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveTransaction(@Body() transactionDto: TransactionDto): Promise<TransactionDto> {
    return await this.transactionService.accountTransaction(transactionDto)

  }

  @Get(':dni')
  async getTransactions(@Param('dni') dni: string): Promise<TransactionDto[]> {
    return await this.transactionService.getAllTransactions(dni);
  }

}
