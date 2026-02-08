import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { GoalModule } from './goal/goal.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    GoalModule,
    TagModule,
    AuthModule,
    PrismaModule,
  ],
  exports: [PrismaService],
})
export class AppModule {}
