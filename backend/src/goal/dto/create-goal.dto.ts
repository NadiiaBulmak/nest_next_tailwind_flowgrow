import { IsNumber, Max } from 'class-validator';

export class CreateGoalDto {
  @IsNumber()
  @Max(20, { message: 'Targer hours per day should be less than 20 hours' })
  target_hours_per_day: number;
}
