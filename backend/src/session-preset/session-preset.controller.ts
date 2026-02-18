import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SessionPresetService } from './session-preset.service';
import { CreateSessionPresetDto } from './dto/create-session-preset.dto';
import { UpdateSessionPresetDto } from './dto/update-session-preset.dto';
import { AuthTokenPayload } from 'src/auth/interfaces/auth.interface';
import { AuthGuard } from 'src/auth/auth.quard';
import {
  getAllSessionSchema,
  sessionPresetSchema,
  sessioPresetPostExample,
} from './swagger-examples/session-preset.swagger-example';

@ApiTags('Session Presets')
@ApiBearerAuth()
@Controller('session-preset')
@UseGuards(AuthGuard)
export class SessionPresetController {
  constructor(private readonly sessionPresetService: SessionPresetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new session preset' })
  @ApiBody({
    type: CreateSessionPresetDto,
    description: 'Create session-preset',
    ...sessioPresetPostExample,
  })
  @ApiResponse({
    status: 201,
    description: 'Session preset created successfully',
    ...sessionPresetSchema,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createSessionPresetDto: CreateSessionPresetDto,
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.sessionPresetService.create(user.id, createSessionPresetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all session presets for the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of session presets',
    ...getAllSessionSchema,
  })
  findAll(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.sessionPresetService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a session preset by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Preset ID' })
  @ApiResponse({
    status: 200,
    description: 'Session preset found',
    ...sessionPresetSchema,
  })
  @ApiResponse({ status: 404, description: 'Session preset not found' })
  findOne(@Param('id') id: string) {
    return this.sessionPresetService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session preset' })
  @ApiParam({ name: 'id', type: 'string', description: 'Preset ID' })
  @ApiBody({
    type: UpdateSessionPresetDto,
    description: 'Update session-preset',
    ...sessioPresetPostExample,
  })
  @ApiResponse({
    status: 200,
    description: 'Session preset updated successfully',
    ...sessionPresetSchema,
  })
  @ApiResponse({ status: 404, description: 'Session preset not found' })
  update(
    @Param('id') id: string,
    @Body() updateSessionPresetDto: UpdateSessionPresetDto,
  ) {
    return this.sessionPresetService.update(id, updateSessionPresetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session preset' })
  @ApiParam({ name: 'id', type: 'string', description: 'Preset ID' })
  @ApiResponse({
    status: 200,
    description: 'Session preset deleted successfully',
    schema: { example: true },
  })
  @ApiResponse({ status: 404, description: 'Session preset not found' })
  remove(@Param('id') id: string) {
    return this.sessionPresetService.remove(id);
  }
}
