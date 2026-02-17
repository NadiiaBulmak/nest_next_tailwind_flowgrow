import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FocusSessionService } from './focus-session.service';
import { CreateFocusSessionDto } from './dto/create-focus-session.dto';
import { UpdateFocusSessionDto } from './dto/update-focus-session.dto';
import { AuthGuard } from 'src/auth/auth.quard';
import { AuthTokenPayload } from 'src/auth/interfaces/auth.interface';
import { Request } from 'express';

@Controller('focus-session')
@UseGuards(AuthGuard)
export class FocusSessionController {
  constructor(private readonly focusSessionService: FocusSessionService) {}

  @Post()
  create(
    @Body() createFocusSessionDto: CreateFocusSessionDto,
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.focusSessionService.create(user.id, createFocusSessionDto);
  }

  @Get()
  findAll(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.focusSessionService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.focusSessionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFocusSessionDto: UpdateFocusSessionDto,
  ) {
    return this.focusSessionService.update(id, updateFocusSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.focusSessionService.remove(id);
  }
}
