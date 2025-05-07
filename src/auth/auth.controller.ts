import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDTO } from './dto/signin-auth.dto';
import { SignUpDTO } from './dto/signup-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authenticator')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService){}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() newUser: SignUpDTO) {
    return this.authService.signUp(newUser);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  logIn(@Body() Credentials: SignInAuthDTO) {
    return this.authService.signIn(Credentials);
  }
}
