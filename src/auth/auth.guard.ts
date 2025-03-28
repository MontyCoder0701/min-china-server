import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.jwt;
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const secret = this.configService.get<string>("JWT_SECRET");
      const payload = await this.jwtService.verifyAsync(token, { secret });
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
