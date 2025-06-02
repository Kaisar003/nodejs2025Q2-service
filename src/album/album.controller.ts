// src/album/album.controller.ts
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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate as uuidValidate } from 'uuid';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('album')
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService,
        private readonly trackService: TrackService,
        private readonly favoritesService: FavoritesService,
    ) { }

    @Get()
    findAll() {
        return this.albumService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid album ID');
        }
        return this.albumService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createAlbumDto: CreateAlbumDto) {
        return this.albumService.create(createAlbumDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid album ID');
        }
        return this.albumService.update(id, updateAlbumDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid album ID');
        }

        // Remove album reference from tracks
        this.trackService.removeAlbumReference(id);

        // Remove from favorites
        this.favoritesService.removeAlbum(id);

        this.albumService.remove(id);
    }
}