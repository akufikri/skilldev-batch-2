import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/auth.dto'; 
import { UserEntity } from "src/users/entities/user.entity"

@Injectable()
export class AuthService {
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
}
