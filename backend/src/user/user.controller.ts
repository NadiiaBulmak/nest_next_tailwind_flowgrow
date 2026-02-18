import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  // Param,
  // Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  // ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  // getAllSchema,
  userSchema,
} from './swagger-examples/user.swagger-example';
import { AuthGuard } from 'src/auth/auth.quard';
import { AuthTokenPayload } from 'src/auth/interfaces/auth.interface';
import { Request } from 'express';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create a new user' })
  // @ApiBody({ type: CreateUserDto })
  // @ApiResponse({
  //   status: 201,
  //   description: 'User created successfully',
  //   ...userSchema,
  // })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Get all users' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of all users',
  //   ...getAllSchema,
  // })
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get()
  @ApiOperation({ summary: 'Get authenticated user' })
  @ApiQuery({
    name: 'extended',
    required: false,
    type: Boolean,
    description: 'Return extended user info with relations',
  })
  @ApiResponse({
    status: 200,
    description: 'User found',
    ...userSchema,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
    @Query('extended') extended?: boolean,
  ) {
    const user: AuthTokenPayload = req.user;
    return this.userService.findOne(user.id, extended);
  }

  @Patch()
  @ApiOperation({ summary: 'Update authenticated user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    ...userSchema,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Req()
    req: Request & {
      user: AuthTokenPayload;
    },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user: AuthTokenPayload = req.user;
    return this.userService.update(user.id, updateUserDto);
  }

  // @Delete()
  // @ApiOperation({ summary: 'Delete authenticated user' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User deleted successfully',
  //   schema: { example: { success: true } },
  // })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // remove(
  //   @Req()
  //   req: Request & {
  //     user: AuthTokenPayload;
  //   },
  // ) {
  //   const user: AuthTokenPayload = req.user;
  //   return this.userService.remove(user.id);
  // }
}
