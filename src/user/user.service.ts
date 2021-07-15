import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll(): Promise<any> {
    return this.userRepo.find();
  }

  async add({ first_name, last_name, email, password }): Promise<any> {
    return this.userRepo.insert({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    });
  }
}
