// src/track/track.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
    imports: [forwardRef(() => FavoritesModule)],
    controllers: [TrackController],
    providers: [TrackService],
    exports: [TrackService],
})
export class TrackModule { }