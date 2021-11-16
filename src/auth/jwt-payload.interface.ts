import { Role } from "./role/roles.enum";

export interface JwtPayload {
    username: string
    role: Role
}