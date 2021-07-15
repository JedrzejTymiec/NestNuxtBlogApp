import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthenticationFilter } from 'src/common/filters/authorization.filter';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseFilters(new AuthenticationFilter())
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.validateUser(loginDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  async loggedUser(@Request() req) {
    return this.authService.getLogged(req.user.id);
  }
}
