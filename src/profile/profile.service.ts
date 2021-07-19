import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Connection } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private connection: Connection,
  ) {}

  async add(userId: string, { about }, avatar?): Promise<void> {
    const user = await this.userService.findById(userId);
    if (user.profile) {
      throw new BadRequestException('User has profile');
    }
    const profile = new Profile();
    profile.about = about;
    profile.avatar = avatar;
    await this.connection.manager.save(profile);
    user.profile = profile;
    await this.connection.manager.save(user);
  }

  async update(profileId, userId, data): Promise<any> {
    const profile = await this.profileRepo.findOne(profileId);
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    const user = await this.userService.findById(userId);
    if (!user.profile.profile_id === profileId) {
      throw new UnauthorizedException();
    }
    return this.profileRepo.update(profileId, data);
  }

  async deleteById(id): Promise<void> {
    const profile = await this.profileRepo.findOne(id);
    await this.profileRepo.remove(profile);
  }
}
