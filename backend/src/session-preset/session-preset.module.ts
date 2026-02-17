import { Module } from '@nestjs/common';
import { SessionPresetService } from './session-preset.service';
import { SessionPresetController } from './session-preset.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SessionPresetController],
  providers: [SessionPresetService],
  exports: [SessionPresetService],
})
export class SessionPresetModule {}
