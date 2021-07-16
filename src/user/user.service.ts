import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find({
      select: ['user_id', 'first_name', 'last_name', 'email'],
    });
  }

  async add({ first_name, last_name, email, password }): Promise<any> {
    const user = await this.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email registred');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return this.userRepo.insert({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashPassword,
    });
  }

  async findByEmail(email): Promise<User> {
    return this.userRepo.findOne({
      where: { email: email },
      select: ['user_id', 'password'],
    });
  }

  async findById(id): Promise<User> {
    return this.userRepo.findOne(id, {
      select: ['user_id', 'first_name', 'last_name'],
      relations: ['articles'],
    });
  }

  async findWithArticles(): Promise<User[]> {
    const users = await this.userRepo.find({
      relations: ['articles'],
    });
    const writers = users.filter((user) => user.articles.length > 0);
    return writers;
  }
}
