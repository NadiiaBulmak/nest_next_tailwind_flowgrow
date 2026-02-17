import {
  IsString,
  IsEnum,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FocusSeccionStatus } from 'generated/prisma/enums';
import { CreateSessionPresetDto } from 'src/session-preset/dto/create-session-preset.dto';

export class CreateFocusSessionDto {
  @IsString()
  @IsOptional()
  preset_id?: string;

  @IsString()
  @IsOptional()
  tag_id?: string;

  @IsOptional()
  session_data?: CreateSessionPresetDto;

  @IsDate()
  @Type(() => Date)
  started_at: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  finished_at?: Date;

  @IsEnum(FocusSeccionStatus)
  status: FocusSeccionStatus;

  @IsNumber()
  actual_duration_seconds: number;
}
