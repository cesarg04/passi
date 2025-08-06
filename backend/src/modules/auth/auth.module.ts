import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

// Application Layer
import { LoginUseCase } from "./application/use-cases/login.use-case";
import { RegisterUseCase } from "./application/use-cases/register.use-case";

// Infrastructure Layer
import { AuthController } from "./infrastructure/controllers/auth.controller";
import { PrismaUserRepository } from "./infrastructure/repositories/prisma-user.repository";
import { BcryptPasswordService } from "./infrastructure/services/bcrypt-password.service";
import { JwtStrategy } from "./infrastructure/strategies/jwt.strategy";

// Domain Tokens
import { USER_REPOSITORY_TOKEN, PASSWORD_SERVICE_TOKEN } from "./domain/tokens";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Use Cases
    LoginUseCase,
    RegisterUseCase,

    // Infrastructure Services
    JwtStrategy,

    // Repository Implementations
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: PrismaUserRepository,
    },

    // Service Implementations
    {
      provide: PASSWORD_SERVICE_TOKEN,
      useClass: BcryptPasswordService,
    },
  ],
  exports: [USER_REPOSITORY_TOKEN, PASSWORD_SERVICE_TOKEN],
})
export class AuthModule {}
