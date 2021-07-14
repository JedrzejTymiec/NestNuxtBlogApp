import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get jwtSecret(): string {
        return this.configService.get<string>('jwt.secret')
    }
}
