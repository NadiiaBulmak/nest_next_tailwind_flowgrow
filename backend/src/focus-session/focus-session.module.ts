import { Module } from '@nestjs/common';
import { FocusSessionService } from './focus-session.service';
import { FocusSessionController } from './focus-session.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FocusSessionController],
  providers: [FocusSessionService],
})
export class FocusSessionModule {}
