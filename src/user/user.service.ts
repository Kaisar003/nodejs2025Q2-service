// src/user/user.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User, UserResponse } from '../types/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(private favoritesService: FavoritesService) { }

    findAll(): UserResponse[] {
        return this.users.map(user => this.excludePassword(user));
    }

    findOne(id: string): UserResponse {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.excludePassword(user);
    }

    create(createUserDto: CreateUserDto): UserResponse {
        const now = Date.now();
        const newUser: User = {
            id: randomUUID(),
            login: createUserDto.login,
            password: createUserDto.password,
            version: 1,
            createdAt: now,
            updatedAt: now,
        };

        this.users.push(newUser);
        return this.excludePassword(newUser);
    }

    update(id: string, updatePasswordDto: UpdatePasswordDto): UserResponse {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.password !== updatePasswordDto.oldPassword) {
            throw new ForbiddenException('Wrong old password');
        }

        user.password = updatePasswordDto.newPassword;
        user.version += 1;
        user.updatedAt = Date.now();

        return this.excludePassword(user);
    }

    remove(id: string): void {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }

        this.users.splice(userIndex, 1);
    }

    private excludePassword(user: User): UserResponse {
        const { password, ...userResponse } = user;
        return userResponse;
    }
}