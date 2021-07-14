import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AppConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
