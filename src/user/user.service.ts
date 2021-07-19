import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ArticleService } from 'src/article/article.service';
import { CommentService } from 'src/comment/comment.service';
import { LikeService } from 'src/like/like.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private articleService: ArticleService,
    private commentService: CommentService,
    private likeService: LikeService,
    private profileService: ProfileService,
  ) {}

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
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          articles: 'user.articles',
          articleComments: 'articles.comments',
          articleLikes: 'articles.likes',
          commentsLikes: 'articleComments.likes',
          profile: 'user.profile',
          comments: 'user.comments',
          likes: 'user.likes',
        },
      },
    });
  }

  async findWithArticles(): Promise<User[]> {
    const users = await this.userRepo.find({
      relations: ['articles'],
    });
    const writers = users.filter((user) => user.articles.length > 0);
    return writers;
  }

  async findTopWriters(): Promise<User[]> {
    const writers = await this.findWithArticles();
    const topWriters = writers
      .sort((a, b) => {
        if (a.articles.length > b.articles.length) return -1;
        if (b.articles.length > a.articles.length) return 1;
        return 0;
      })
      .splice(0, 2);
    return topWriters;
  }

  async deleteAll(id): Promise<void> {
    await this.articleService.deleteAllByUser(id);
    await this.commentService.deleteAllByUser(id);
    await this.likeService.deleteAllByUser(id);
    const user = await this.userRepo.findOne(id);
    if (user.profile) {
      await this.profileService.deleteById(user.profile.profile_id);
    }
    await this.userRepo.remove(user);
  }
}
