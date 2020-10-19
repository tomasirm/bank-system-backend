import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
  }

  generateJWT(payload): string{
    return this.jwtService.sign(payload);
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);

  }

  comparePasswords(newPassword: string, passwortHash: string){
    return bcrypt.compare(newPassword, passwortHash);
  }


}
