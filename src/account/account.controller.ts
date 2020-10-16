import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './account.dto';

@Controller('account')
export class AccountController {

  constructor(private readonly accountService: AccountService) {
  }

  @Post(':dni')
  async saveAccount(@Param('dni') dni: string): Promise<AccountDto> {
    return await this.accountService.saveAccount(dni);
  }

  @Get(':dni')
  async getAccount(@Param('dni') dni: string): Promise<AccountDto> {
    return await this.accountService.getAccount(dni);
  }

}

