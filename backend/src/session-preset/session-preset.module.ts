import { Module } from '@nestjs/common';
import { SessionPresetService } from './session-preset.service';
import { SessionPresetController } from './session-preset.controller';

@Module({
  controllers: [SessionPresetController],
  providers: [SessionPresetService],
})
export class SessionPresetModule {}
