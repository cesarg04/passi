import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { UserRepository } from "../../domain/repositories/user.repository";
import type { PasswordService } from "../../domain/services/password.service";
import {
  USER_REPOSITORY_TOKEN,
  PASSWORD_SERVICE_TOKEN,
} from "../../domain/tokens";
import { LoginDto, AuthResponseDto } from "../dto/auth.dto";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_SERVICE_TOKEN)
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const isPasswordValid = await this.passwordService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id!,
        email: user.email,
        name: user.name,
      },
    };
  }
}
