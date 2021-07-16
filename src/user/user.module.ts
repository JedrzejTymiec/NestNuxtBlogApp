import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ArticleModule } from 'src/article/article.module';
import { CommentModule } from 'src/comment/comment.module';
import { LikeModule } from 'src/like/like.module';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ArticleModule,
    CommentModule,
    LikeModule,
    forwardRef(() => ProfileModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
