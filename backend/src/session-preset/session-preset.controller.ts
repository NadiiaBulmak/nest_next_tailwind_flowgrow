import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SessionPresetService } from './session-preset.service';
import { CreateSessionPresetDto } from './dto/create-session-preset.dto';
import { UpdateSessionPresetDto } from './dto/update-session-preset.dto';
import { AuthTokenPayload } from 'src/auth/interfaces/auth.interface';
import { AuthGuard } from 'src/auth/auth.quard';

@Controller('session-preset')
@UseGuards(AuthGuard)
export class SessionPresetController {
  constructor(private readonly sessionPresetService: SessionPresetService) {}

  @Post()
  create(
    @Body() createSessionPresetDto: CreateSessionPresetDto,
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.sessionPresetService.create(user.id, createSessionPresetDto);
  }

  @Get()
  findAll(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.sessionPresetService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionPresetService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSessionPresetDto: UpdateSessionPresetDto,
  ) {
    return this.sessionPresetService.update(id, updateSessionPresetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionPresetService.remove(id);
  }
}
