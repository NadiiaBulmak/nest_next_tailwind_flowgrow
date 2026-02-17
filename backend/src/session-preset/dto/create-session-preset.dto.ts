import { IsString, IsOptional, IsEnum } from 'class-validator';
import { FocusSeccionType } from 'generated/prisma/enums';

export class CreateSessionPresetDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(FocusSeccionType)
  type?: FocusSeccionType;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  rest_duration?: string;

  @IsOptional()
  @IsString()
  animation?: string;

  @IsOptional()
  @IsString()
  end_sound?: string;
}
