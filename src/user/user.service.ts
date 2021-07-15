import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll(): Promise<UserInterface[]> {
    return this.userRepo.find({
      select: ['id', 'first_name', 'last_name'],
    });
  }

  async add({ first_name, last_name, email, password }): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return this.userRepo.insert({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashPassword,
    });
  }

  async findByEmail(email): Promise<UserInterface> {
    return this.userRepo.findOne({
      where: { email: email },
      select: ['password'],
    });
  }
}
