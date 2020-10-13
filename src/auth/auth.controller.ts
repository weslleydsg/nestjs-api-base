import { Controller, Post, Body } from '@nestjs/common';
import { TransformClassToPlain } from 'class-transformer';

import { JsonApi } from 'src/shared/interceptors/response.interceptor';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @TransformClassToPlain()
  async login(@Body() data: LoginDTO): Promise<JsonApi> {
    return { data: await this.authService.login(data) };
  }

  @Post('register')
  @TransformClassToPlain()
  async register(@Body() data: RegisterDTO): Promise<JsonApi> {
    return { data: await this.authService.register(data) };
  }
}
