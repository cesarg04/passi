import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RegisterUseCase } from "../../application/use-cases/register.use-case";
import {
  LoginDto,
  RegisterDto,
  AuthResponseDto,
} from "../../application/dto/auth.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@ApiTags("Autenticación")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @ApiOperation({ summary: "Iniciar sesión" })
  @ApiResponse({
    status: 200,
    description: "Login exitoso",
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: "Credenciales inválidas" })
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }

  @ApiOperation({ summary: "Registrar nuevo usuario" })
  @ApiResponse({
    status: 201,
    description: "Usuario registrado exitosamente",
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 409, description: "El email ya está registrado" })
  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.registerUseCase.execute(registerDto);
  }

  @ApiOperation({ summary: "Obtener perfil del usuario autenticado" })
  @ApiResponse({ status: 200, description: "Perfil del usuario" })
  @ApiResponse({ status: 401, description: "No autorizado" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
