import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  profile_id: number;

  @Column('text')
  about: string;

  @Column()
  avatar: string;
}
