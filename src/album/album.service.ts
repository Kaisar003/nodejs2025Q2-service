// src/album/album.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Album } from '../types/interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
    private albums: Album[] = [];

    findAll(): Album[] {
        return this.albums;
    }

    findOne(id: string): Album {
        const album = this.albums.find(album => album.id === id);
        if (!album) {
            throw new NotFoundException('Album not found');
        }
        return album;
    }

    create(createAlbumDto: CreateAlbumDto): Album {
        const newAlbum: Album = {
            id: randomUUID(),
            name: createAlbumDto.name,
            year: createAlbumDto.year,
            artistId: createAlbumDto.artistId || null,
        };

        this.albums.push(newAlbum);
        return newAlbum;
    }

    update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
        const album = this.albums.find(album => album.id === id);
        if (!album) {
            throw new NotFoundException('Album not found');
        }

        if (updateAlbumDto.name !== undefined) {
            album.name = updateAlbumDto.name;
        }
        if (updateAlbumDto.year !== undefined) {
            album.year = updateAlbumDto.year;
        }
        if (updateAlbumDto.artistId !== undefined) {
            album.artistId = updateAlbumDto.artistId;
        }

        return album;
    }

    remove(id: string): void {
        const albumIndex = this.albums.findIndex(album => album.id === id);
        if (albumIndex === -1) {
            throw new NotFoundException('Album not found');
        }

        this.albums.splice(albumIndex, 1);
    }

    removeArtistReference(artistId: string): void {
        this.albums.forEach(album => {
            if (album.artistId === artistId) {
                album.artistId = null;
            }
        });
    }

    exists(id: string): boolean {
        return this.albums.some(album => album.id === id);
    }
}