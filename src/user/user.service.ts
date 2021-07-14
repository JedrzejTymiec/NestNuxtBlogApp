import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<any> {
    const users = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
    return users;
  }

  async add(): Promise<any> {
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        first_name: 'Jędrzej',
        last_name: 'Tymiec',
        email: 'Jedrek1692@gmail.com',
        password: '123456',
        location: 'Gdańsk',
        department: 'development',
        is_admin: true,
        age: 29,
      })
      .execute();
  }
}
