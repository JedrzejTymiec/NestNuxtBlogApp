import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { Express } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      dest: '../uploads',
    }),
  )
  async create(
    @Request() req,
    @Body() profileDto: ProfileDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<void> {
    return this.profileService.add(req.user.id, profileDto, avatar.path);
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
