import { IsNumber, IsUUID } from 'class-validator';

export class CreateGoalDto {
  @IsUUID()
  user_id: string;

  @IsNumber()
  target_hours_per_day: number;
}
