// src/track/track.controller.ts
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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate as uuidValidate } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('track')
export class TrackController {
    constructor(
        private readonly trackService: TrackService,
        private readonly favoritesService: FavoritesService,
    ) { }

    @Get()
    findAll() {
        return this.trackService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid track ID');
        }
        return this.trackService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createTrackDto: CreateTrackDto) {
        return this.trackService.create(createTrackDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid track ID');
        }
        return this.trackService.update(id, updateTrackDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Invalid track ID');
        }

        // Remove from favorites
        this.favoritesService.removeTrack(id);

        this.trackService.remove(id);
    }
}