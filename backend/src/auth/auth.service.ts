import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { hashPassword } from 'src/common/utils/hashPassword.util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthTokenPayload } from './interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async generateTokens(payload: AuthTokenPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }
    const equal = await bcrypt.compare(password, user?.password);

    if (!equal) {
      throw new UnauthorizedException();
    }

    const payload: AuthTokenPayload = { id: user.id, email: user.email };

    const tokens = await this.generateTokens(payload);

    return {
      tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async registerUser({ email, password, name }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new ConflictException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, ...result } =
      await this.userService.create({
        email,
        password: await hashPassword(password),
        name,
      });
    return result;
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<AuthTokenPayload>(
        refreshToken,
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        },
      );

      const { accessToken } = await this.generateTokens({
        id: payload.id,
        email: payload.email,
      });

      return { accessToken };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
