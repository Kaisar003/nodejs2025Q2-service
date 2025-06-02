// src/artist/artist.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
    imports: [
        forwardRef(() => AlbumModule),
        forwardRef(() => TrackModule),
        forwardRef(() => FavoritesModule),
    ],
    controllers: [ArtistController],
    providers: [ArtistService],
    exports: [ArtistService],
})
export class ArtistModule { }