import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
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
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { AuthGuard } from 'src/auth/auth.quard';
import { Request } from 'express';
import { AuthTokenPayload } from 'src/auth/interfaces/auth.interface';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  getAllTagsExample,
  tagBodyRequestExample,
  tagSchema,
} from './swagger-examples/tag.swagger-example';

@ApiTags('Tags')
@ApiBearerAuth()
@Controller('tag')
@UseGuards(AuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBody({
    type: CreateTagDto,
    description: 'Create tag',
    ...tagBodyRequestExample,
  })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
    ...tagSchema,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createTagDto: CreateTagDto,
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;

    return this.tagService.create(createTagDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tags for the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of user tags',
    ...getAllTagsExample,
  })
  findAll(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
  ) {
    const user: AuthTokenPayload = req.user;
    return this.tagService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tag by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Tag ID' })
  @ApiResponse({
    status: 200,
    description: 'Tag found',
    ...tagSchema,
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tag' })
  @ApiParam({ name: 'id', type: 'string', description: 'Tag ID' })
  @ApiBody({
    type: CreateTagDto,
    description: 'Update tag',
    ...tagBodyRequestExample,
  })
  @ApiResponse({
    status: 200,
    description: 'Tag updated successfully',
    ...tagSchema,
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    return this.tagService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiParam({ name: 'id', type: 'string', description: 'Tag ID' })
  @ApiResponse({
    status: 200,
    description: 'Tag deleted successfully',
    schema: { example: true },
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
