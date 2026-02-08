import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { GoalModule } from './goal/goal.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [UserModule, GoalModule, TagModule, AuthModule],
  exports: [PrismaService],
})
export class AppModule {}
