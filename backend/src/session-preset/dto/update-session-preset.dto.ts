import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionPresetDto } from './create-session-preset.dto';

export class UpdateSessionPresetDto extends PartialType(
  CreateSessionPresetDto,
) {}
