import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import {
  goalPostExample,
  goalSchema,
} from './swagger-examples/goal.swagger-example';
import { Request } from 'express';
import { AuthTokenPayload } from 'src/auth/interfaces/auth.interface';

@ApiTags('Goals')
@ApiBearerAuth()
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new goal' })
  @ApiBody({
    type: CreateGoalDto,
    description: 'Create goal',
    ...goalPostExample,
  })
  @ApiResponse({
    status: 201,
    description: 'Goal created successfully',
    ...goalSchema,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createGoalDto: CreateGoalDto,
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.goalService.create(
      {
        ...createGoalDto,
      },
      user.id,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get goal' })
  @ApiResponse({
    status: 200,
    description: 'Goal found',
    ...goalSchema,
  })
  @ApiResponse({ status: 404, description: 'Goal not found' })
  findOne(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.goalService.findOne(user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a goal' })
  @ApiBody({
    type: CreateGoalDto,
    description: 'Update goal',
    ...goalPostExample,
  })
  @ApiResponse({
    status: 200,
    description: 'Goal updated successfully',
    ...goalSchema,
  })
  @ApiResponse({ status: 404, description: 'Goal not found' })
  update(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    const user: AuthTokenPayload = req.user;
    return this.goalService.update(user.id, updateGoalDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a goal' })
  @ApiResponse({
    status: 200,
    description: 'Goal deleted successfully',
    schema: { example: { success: true } },
  })
  @ApiResponse({ status: 404, description: 'Goal not found' })
  remove(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.goalService.remove(user.id);
  }
}
