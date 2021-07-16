import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Request() req, @Body() profileDto: ProfileDto): Promise<void> {
    return this.profileService.add(req.user.id, profileDto);
  }

  @Put(':profile_id')
  @UseGuards(JwtGuard)
  async edit(
    @Body() profileDto: ProfileDto,
    @Request() req,
    @Param('profile_id') id: string,
  ): Promise<any> {
    return this.profileService.update(id, req.user.id, profileDto);
  }
}
