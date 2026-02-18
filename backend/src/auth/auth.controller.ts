import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { RequestWithCookies } from './interfaces/auth.interface';
import {
  authLoginResponse,
  authRefreshResponse,
  authRegisterResponse,
} from './swagger-examples/auth.swagger-example';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User sign in with email and password' })
  @ApiBody({
    type: SignInDto,
    description: 'Sign in credentials',
    examples: {
      default: {
        summary: 'Example request',
        value: {
          email: 'user@example.com',
          password: 'strongPassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
    ...authLoginResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      tokens: { accessToken, refreshToken },
      user,
    } = await this.authService.signIn(signInDto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
      user,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({
    type: RegisterDto,
    description: 'Log in credentials',
    examples: {
      default: {
        summary: 'Example request',
        value: {
          name: 'UserUser',
          email: 'user@example.com',
          password: 'strongPassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully registered',
    ...authRegisterResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Email already exists or bad request',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed successfully',
    ...authRefreshResponse,
  })
  @ApiResponse({ status: 401, description: 'Refresh token missing or invalid' })
  async refresh(@Req() req: RequestWithCookies) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    return this.authService.refreshTokens(refreshToken);
  }

  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out',
    schema: { example: { success: true } },
  })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return { success: true };
  }
}
