import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async allUsers(): Promise<any> {
    return this.userService.findAll();
  }

  @Post()
  async create(): Promise<any> {
    return this.userService.add();
  }
}
