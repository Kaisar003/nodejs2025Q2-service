// src/artist/artist.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate as uuidValidate } from 'uuid';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('artist')
export class ArtistController {
    constructor(
        private readonly artistService: ArtistService,
        private readonly albumService: AlbumService,
        private readonly trackService: TrackService,
        private readonly favoritesService: FavoritesService,
    ) { }

    @Get()
    findAll() {
        return this.artistService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid artist ID');
        }
        return this.artistService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createArtistDto: CreateArtistDto) {
        return this.artistService.create(createArtistDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid artist ID');
        }
        return this.artistService.update(id, updateArtistDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid artist ID');
        }

        // Remove artist reference from albums and tracks
        this.albumService.removeArtistReference(id);
        this.trackService.removeArtistReference(id);

        // Remove from favorites
        this.favoritesService.removeArtist(id);

        this.artistService.remove(id);
    }
}