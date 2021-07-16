import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async allUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<any> {
    return this.userService.add(userDto);
  }

  @Get('writers')
  async getWriters(): Promise<User[]> {
    return this.userService.findWithArticles();
  }
}
