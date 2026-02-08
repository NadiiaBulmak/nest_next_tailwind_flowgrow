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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

    return {
      access_token: await this.jwtService.signAsync(payload),
      email: email,
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
}
