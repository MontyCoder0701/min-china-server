import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Response() res: any) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 20 * 60 * 1000,
    });

    return res.json({ message: '로그인 성공' });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('logout')
  logout(@Response() res: any) {
    res.clearCookie('jwt');
    return res.json({ message: '로그아웃 성공' });
  }
}
