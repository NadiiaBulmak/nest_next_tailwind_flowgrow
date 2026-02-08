import { Injectable } from '@nestjs/common';
// import { CreateTagDto } from './dto/create-tag.dto';
// import { UpdateTagDto } from './dto/update-tag.dto';
// import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagService {
  // constructor(private prisma: PrismaService) {}
  // create(createTagDto: CreateTagDto, userId?: string) {
  //   this.prisma.tag.create({
  //     data: {
  //       ...createTagDto,
  //       user_id,
  //     },
  //   });
  // }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: string) {
    return `This action returns a #${id} tag`;
  }

  update(id: string) {
    return `This action updates a #${id} tag`;
  }

  remove(id: string) {
    return `This action removes a #${id} tag`;
  }
}
