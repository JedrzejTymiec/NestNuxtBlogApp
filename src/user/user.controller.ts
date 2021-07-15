import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async allUsers(): Promise<UserInterface[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<any> {
    return this.userService.add(userDto);
  }
}
