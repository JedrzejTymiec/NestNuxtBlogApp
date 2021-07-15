import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly first_name: string;
  @IsNotEmpty()
  readonly last_name: string;
  @IsEmail()
  readonly email: string;
  @Length(6)
  readonly password: string;
}
