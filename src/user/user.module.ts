// src/user/user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
    imports: [forwardRef(() => FavoritesModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }