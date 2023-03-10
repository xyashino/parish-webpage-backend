import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IntentionEntity } from './intention.entity';
import { DayIntentionEntity } from '../../types';
import { Day } from '../../enums/day.enum';

@Entity()
export class IntentionsDayEntity
  extends BaseEntity
  implements DayIntentionEntity
{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'enum',
    enum: Day,
    unique: true,
  })
  day: Day;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  dateOfDay: Date | null;
  @Column('tinyint')
  order: number;

  @OneToMany(() => IntentionEntity, (intention) => intention.day, {
    cascade: true,
  })
  intentions: IntentionEntity[];

  @BeforeInsert()
  setDayOrder() {
    const weekday = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    this.order = weekday.findIndex((el) => el === this.day);
  }
}
