import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../role/roles.enum";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER})
    role: Role;
}

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.ADMIN})
    role: Role;
}