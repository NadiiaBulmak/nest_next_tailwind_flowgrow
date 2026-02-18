import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  async create(createGoalDto: CreateGoalDto, userId: string) {
    const goalExist = await this.findOne(userId);
    if (goalExist) {
      return await this.update(userId, {
        target_hours_per_day: createGoalDto.target_hours_per_day,
      });
    }
    return await this.prisma.goal.create({
      data: { ...createGoalDto, user_id: userId },
    });
  }

  async findOne(userId: string) {
    return await this.prisma.goal.findUnique({ where: { user_id: userId } });
  }

  async update(userId: string, updateGoalDto: UpdateGoalDto) {
    return await this.prisma.goal.update({
      where: { user_id: userId },
      data: updateGoalDto,
    });
  }

  async remove(userId: string) {
    const goalExist = await this.findOne(userId);
    if (!goalExist) {
      throw new NotFoundException('Product is not found');
    }

    try {
      await this.prisma.goal.delete({ where: { user_id: userId } });
    } catch {
      throw new Error('Deleting is unavalable');
    }

    return true;
  }
}
