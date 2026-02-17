import { Injectable } from '@nestjs/common';
import { CreateSessionPresetDto } from './dto/create-session-preset.dto';
import { UpdateSessionPresetDto } from './dto/update-session-preset.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionPresetService {
  constructor(private prisma: PrismaService) {}
  async create(userId: string, createSessionPresetDto: CreateSessionPresetDto) {
    return await this.prisma.sessionPreset.create({
      data: { ...createSessionPresetDto, user_id: userId },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.sessionPreset.findMany({
      where: { user_id: userId },
    });
  }

  async findOne(id: string) {
    return await this.prisma.sessionPreset.findUnique({ where: { id } });
  }

  async update(id: string, updateSessionPresetDto: UpdateSessionPresetDto) {
    return await this.prisma.sessionPreset.update({
      where: { id },
      data: { ...updateSessionPresetDto },
    });
  }

  async remove(id: string) {
    return await this.prisma.sessionPreset.delete({ where: { id } });
  }
}
