import { Injectable, NotFoundException } from '@nestjs/common';
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
        user: { connect: { id: userId } },
        preset: { connect: { id: presetId } },
        tag: createFocusSessionDto.tag_id
          ? { connect: { id: createFocusSessionDto.tag_id } }
          : undefined,
        started_at: createFocusSessionDto.started_at,
        finished_at: createFocusSessionDto.finished_at,
        status: createFocusSessionDto.status,
        actual_duration_seconds: createFocusSessionDto.actual_duration_seconds,
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
    const focusSession = await this.prisma.focusSession.findUnique({
      where: { id },
    });

    if (!focusSession) {
      throw new NotFoundException('Focus-session is not found');
    }

    return focusSession;
  }

  async update(id: string, updateFocusSessionDto: UpdateFocusSessionDto) {
    const focusSession = await this.findOne(id);
    return focusSession
      ? await this.prisma.focusSession.update({
          where: { id },
          data: { ...updateFocusSessionDto },
        })
      : null;
  }

  async remove(id: string) {
    const focusSession = await this.findOne(id);
    return focusSession
      ? !!(await this.prisma.focusSession.delete({ where: { id } }))
      : false;
  }
}
