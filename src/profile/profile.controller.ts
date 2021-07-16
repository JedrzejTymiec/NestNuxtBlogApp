import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Request() req, @Body() profileDto: ProfileDto): Promise<any> {
    return this.profileService.add(req.user.id, profileDto);
  }
}
