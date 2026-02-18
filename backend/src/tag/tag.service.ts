import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.prisma.tag.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        name: true,
        color: true,
        description: true,
      },
    });
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException('Tag does not exist');
    }

    return tag;
  }

  async update(id: string, dto: UpdateTagDto) {
    const isTagExist = await this.findOne(id);

    return isTagExist
      ? await this.prisma.tag.update({ where: { id }, data: { ...dto } })
      : null;
  }

  async remove(id: string) {
    const isTagExist = await this.findOne(id);

    return isTagExist
      ? !!(await this.prisma.tag.delete({ where: { id } }))
      : false;
  }
}
