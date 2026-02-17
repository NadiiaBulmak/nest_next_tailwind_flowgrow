import { Injectable } from '@nestjs/common';
import { CreateFocusSessionDto } from './dto/create-focus-session.dto';
import { UpdateFocusSessionDto } from './dto/update-focus-session.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FocusSessionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createFocusSessionDto: CreateFocusSessionDto) {
    const presetId = createFocusSessionDto.preset_id
      ? createFocusSessionDto.preset_id
      : (
          await this.prisma.sessionPreset.create({
            data: { ...createFocusSessionDto.session_data, user_id: userId },
          })
        ).id;

    return await this.prisma.focusSession.create({
      data: {
        ...createFocusSessionDto,
        user_id: userId,
        preset_id: presetId,
      },
      include: {
        preset: true,
        tag: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.focusSession.findMany({
      where: { user_id: userId },
    });
  }

  async findOne(id: string) {
    return await this.prisma.focusSession.findUnique({ where: { id } });
  }

  async update(id: string, updateFocusSessionDto: UpdateFocusSessionDto) {
    return await this.prisma.focusSession.update({
      where: { id },
      data: { ...updateFocusSessionDto },
    });
  }

  async remove(id: string) {
    return await this.prisma.focusSession.delete({ where: { id } });
  }
}
