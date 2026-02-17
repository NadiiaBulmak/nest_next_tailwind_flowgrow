import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { AuthGuard } from 'src/auth/auth.quard';
import { Request } from 'express';
import { AuthTokenPayload } from 'src/auth/interfaces/auth.interface';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tag')
@UseGuards(AuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(
    @Body() createTagDto: CreateTagDto,
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;

    return this.tagService.create(createTagDto, user.id);
  }

  @Get()
  findAll(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.tagService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    return this.tagService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
