import { Injectable, ConflictException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { UserRepository } from "../../domain/repositories/user.repository";
import type { PasswordService } from "../../domain/services/password.service";
import {
  USER_REPOSITORY_TOKEN,
  PASSWORD_SERVICE_TOKEN,
} from "../../domain/tokens";
import { User } from "../../domain/entities/user.entity";
import { RegisterDto, AuthResponseDto } from "../dto/auth.dto";

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_SERVICE_TOKEN)
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException("El email ya está registrado");
    }

    // Hash de la contraseña
    const hashedPassword = await this.passwordService.hash(
      registerDto.password,
    );

    // Crear nuevo usuario
    const newUser = User.create(
      registerDto.email,
      hashedPassword,
      registerDto.name,
    );
    const createdUser = await this.userRepository.create(newUser);

    // Generar JWT
    const payload = { email: createdUser.email, sub: createdUser.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: createdUser.id!,
        email: createdUser.email,
        name: createdUser.name,
      },
    };
  }
}
