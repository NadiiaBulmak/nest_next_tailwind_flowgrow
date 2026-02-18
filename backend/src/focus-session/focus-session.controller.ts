import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FocusSessionService } from './focus-session.service';
import { CreateFocusSessionDto } from './dto/create-focus-session.dto';
import { UpdateFocusSessionDto } from './dto/update-focus-session.dto';
import { AuthGuard } from 'src/auth/auth.quard';
import { AuthTokenPayload } from 'src/auth/interfaces/auth.interface';
import { Request } from 'express';
import {
  focusSessionBodyRequestExample,
  focusSessionSchema,
  getAllFocusSession,
} from './swagger-examples/focus-session.swagger-example';

@ApiTags('Focus Sessions')
@ApiBearerAuth()
@Controller('focus-session')
@UseGuards(AuthGuard)
export class FocusSessionController {
  constructor(private readonly focusSessionService: FocusSessionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new focus session' })
  @ApiBody({
    type: CreateFocusSessionDto,
    description: 'Create focus session',
    ...focusSessionBodyRequestExample,
  })
  @ApiResponse({
    status: 201,
    description: 'Focus session created successfully',
    ...focusSessionSchema,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createFocusSessionDto: CreateFocusSessionDto,
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.focusSessionService.create(user.id, createFocusSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all focus sessions for the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of focus sessions',
    ...getAllFocusSession,
  })
  findAll(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.focusSessionService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a focus session by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiResponse({
    status: 200,
    description: 'Focus session found',
    ...focusSessionSchema,
  })
  @ApiResponse({ status: 404, description: 'Focus session not found' })
  findOne(@Param('id') id: string) {
    return this.focusSessionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a focus session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiBody({
    type: UpdateFocusSessionDto,
    description: 'Update focus session',
    ...focusSessionBodyRequestExample,
  })
  @ApiResponse({
    status: 200,
    description: 'Focus session updated successfully',
    ...focusSessionSchema,
  })
  @ApiResponse({ status: 404, description: 'Focus session not found' })
  update(
    @Param('id') id: string,
    @Body() updateFocusSessionDto: UpdateFocusSessionDto,
  ) {
    return this.focusSessionService.update(id, updateFocusSessionDto);
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a focus session' })
  // @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Focus session deleted successfully',
  //   schema: { example: true },
  // })
  // @ApiResponse({ status: 404, description: 'Focus session not found' })
  // remove(@Param('id') id: string) {
  //   return this.focusSessionService.remove(id);
  // }
}
