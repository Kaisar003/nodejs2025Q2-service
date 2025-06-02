// src/artist/artist.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Artist } from '../types/interfaces';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
    private artists: Artist[] = [];

    findAll(): Artist[] {
        return this.artists;
    }

    findOne(id: string): Artist {
        const artist = this.artists.find(artist => artist.id === id);
        if (!artist) {
            throw new NotFoundException('Artist not found');
        }
        return artist;
    }

    create(createArtistDto: CreateArtistDto): Artist {
        const newArtist: Artist = {
            id: randomUUID(),
            name: createArtistDto.name,
            grammy: createArtistDto.grammy,
        };

        this.artists.push(newArtist);
        return newArtist;
    }

    update(id: string, updateArtistDto: UpdateArtistDto): Artist {
        const artist = this.artists.find(artist => artist.id === id);
        if (!artist) {
            throw new NotFoundException('Artist not found');
        }

        if (updateArtistDto.name !== undefined) {
            artist.name = updateArtistDto.name;
        }
        if (updateArtistDto.grammy !== undefined) {
            artist.grammy = updateArtistDto.grammy;
        }

        return artist;
    }

    remove(id: string): void {
        const artistIndex = this.artists.findIndex(artist => artist.id === id);
        if (artistIndex === -1) {
            throw new NotFoundException('Artist not found');
        }

        this.artists.splice(artistIndex, 1);
    }

    exists(id: string): boolean {
        return this.artists.some(artist => artist.id === id);
    }
}