// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from "@nestjs/common";

export const ROLE_KEY = "roles";  // kunci penyimpanan metadata

// dipakai di atas method Controller: @Roles('MANAGER', 'ADMIN')
export const Roles = (...roles: string[]) => SetMetadata(ROLE_KEY, roles);