import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto'; 
import { UserEntity } from "src/users/entities/user.entity"

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(private readonly userService: UsersService){} // 👈 suntik UsersService, bukan bikin baru
  
  async register(dto: RegisterDto){
    const isExistingUser = await this.userService.findByEmail(dto.email);
    if(isExistingUser) throw new ConflictException("Email already exists");

    const passwordHash = await bcrypt.hash(dto.password, 10) // 👈 10 = salt rounds, hash password mentah

    const newUser = await this.userService.create({
      name: dto.name,
      email: dto.email,
      passwordHash // simpan versi HASH, bukan password asli
    })

    return new UserEntity(newUser.toObject()) // bungkus dengan Entity agar passwordHash tersembunyi
  }

  async login(dto: LoginDto){
    const user = await this.userService.findByEmail(dto.email, true);  // true → ikut ambil passwordHash
    if(!user) throw new UnauthorizedException("Invalid Credentials"); // pesan generik, jangan bocorkan "email tidak ditemukan"

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash) // bandingkan tanpa "membuka" hash
    if(!isPasswordValid) throw new UnauthorizedException("Invalid Credentials")

    const payload = { sub: user._id, email: user.email, role: user.role }; // 'sub' = standar JWT untuk ID unik

    // Untuk membuat access token, beserta expired nya
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_TOKEN,
      expiresIn: "1h"
    })

    // Untuk me refresh token, apabila token yang dibuat sudah expired
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: "7d",
    })

    return { accessToken, refreshToken, user: new UserEntity(user.toObject()) } // Entity → passwordHash tetap tersembunyi
  }
}
