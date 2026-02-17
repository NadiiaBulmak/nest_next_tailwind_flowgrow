import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}
  async create(createTagDto: CreateTagDto, userId?: string) {
    return await this.prisma.tag.create({
      data: {
        ...createTagDto,
        user_id: userId,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.tag.findMany({ where: { user_id: userId } });
  }

  async findOne(id: string) {
    return await this.prisma.tag.findUnique({ where: { id } });
    return `This action returns a #${id} tag`;
  }

  async update(id: string, dto: UpdateTagDto) {
    return await this.prisma.tag.update({ where: { id }, data: { ...dto } });
  }

  async remove(id: string) {
    return await this.prisma.tag.delete({ where: { id } });
  }
}
