import { IsString, IsOptional, IsEnum, IsNumber, Min } from 'class-validator';
import { FocusSeccionType } from 'generated/prisma/enums';

export class CreateSessionPresetDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(FocusSeccionType)
  type?: FocusSeccionType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  duration: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  cycles?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rest_duration?: number;

  @IsOptional()
  @IsString()
  animation?: string;

  @IsOptional()
  @IsString()
  end_sound?: string;
}
