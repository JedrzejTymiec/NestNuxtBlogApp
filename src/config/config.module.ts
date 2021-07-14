import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string()
      })
    })
  ],
  providers: [AppConfigService, ConfigService],
  exports: [AppConfigService, ConfigService]
})
export class AppConfigModule {}
