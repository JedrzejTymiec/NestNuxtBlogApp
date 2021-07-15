import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import {
  EmailException,
  PasswordException,
} from 'src/common/exceptions/login.exception';
import * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser({ email, password }): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new EmailException();
    }
    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword) {
      throw new PasswordException();
    }
    const token = this.jwtService.sign({
      user: user.user_id,
    });
    return { token };
  }

  async getLogged(id) {
    return this.userService.findById(id);
  }
}
