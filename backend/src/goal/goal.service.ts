import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  async create(createGoalDto: CreateGoalDto) {
    return await this.prisma.goal.create({ data: createGoalDto });
  }

  findOne(userId: string) {
    return this.prisma.goal.findUnique({ where: { user_id: userId } });
  }

  update(userId: string, updateGoalDto: UpdateGoalDto) {
    return this.prisma.goal.update({
      where: { user_id: userId },
      data: updateGoalDto,
    });
  }

  remove(userId: string) {
    return this.prisma.goal.delete({ where: { user_id: userId } });
  }
}
