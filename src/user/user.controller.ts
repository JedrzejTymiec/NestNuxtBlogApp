import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { JwtGuard } from 'src/common/guards/jwt.guard';

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

  @Get('writers/top')
  async getTop3(): Promise<User[]> {
    return this.userService.findTopWriters();
  }

  @Delete()
  @UseGuards(JwtGuard)
  async delete(@Request() req): Promise<void> {
    return this.userService.deleteAll(req.user.id);
  }
}
