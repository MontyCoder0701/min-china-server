import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, pass: string): Promise<string> {
    const user = await this.userService.findOne(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
