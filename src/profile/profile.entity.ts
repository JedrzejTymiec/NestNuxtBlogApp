import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @Column('text')
  about: string;

  @Column({
    default:
      'https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg',
  })
  avatar: string;
}
