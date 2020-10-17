import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerDto } from '../customer/customer.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private customerService: CustomerService,
              @InjectRepository(CustomerEntity) private readonly customerEntityRepository: Repository<CustomerEntity>) {}

  async login(customerDto: CustomerDto):Promise<any> {
    const customar = await this.customerEntityRepository.findOne({email: customerDto.email, password: customerDto.password});
    if(!customar || !customar.id){
      throw new HttpException('These credentials do not match our records', HttpStatus.NOT_FOUND);
    }
    const payload = { username: CustomerDto.fromEntity(customar)};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
