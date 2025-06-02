// src/track/track.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Track } from '../types/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
    private tracks: Track[] = [];

    findAll(): Track[] {
        return this.tracks;
    }

    findOne(id: string): Track {
        const track = this.tracks.find(track => track.id === id);
        if (!track) {
            throw new NotFoundException('Track not found');
        }
        return track;
    }

    create(createTrackDto: CreateTrackDto): Track {
        const newTrack: Track = {
            id: randomUUID(),
            name: createTrackDto.name,
            artistId: createTrackDto.artistId || null,
            albumId: createTrackDto.albumId || null,
            duration: createTrackDto.duration,
        };

        this.tracks.push(newTrack);
        return newTrack;
    }

    update(id: string, updateTrackDto: UpdateTrackDto): Track {
        const track = this.tracks.find(track => track.id === id);
        if (!track) {
            throw new NotFoundException('Track not found');
        }

        if (updateTrackDto.name !== undefined) {
            track.name = updateTrackDto.name;
        }
        if (updateTrackDto.artistId !== undefined) {
            track.artistId = updateTrackDto.artistId;
        }
        if (updateTrackDto.albumId !== undefined) {
            track.albumId = updateTrackDto.albumId;
        }
        if (updateTrackDto.duration !== undefined) {
            track.duration = updateTrackDto.duration;
        }

        return track;
    }

    remove(id: string): void {
        const trackIndex = this.tracks.findIndex(track => track.id === id);
        if (trackIndex === -1) {
            throw new NotFoundException('Track not found');
        }

        this.tracks.splice(trackIndex, 1);
    }

    removeArtistReference(artistId: string): void {
        this.tracks.forEach(track => {
            if (track.artistId === artistId) {
                track.artistId = null;
            }
        });
    }

    removeAlbumReference(albumId: string): void {
        this.tracks.forEach(track => {
            if (track.albumId === albumId) {
                track.albumId = null;
            }
        });
    }

    exists(id: string): boolean {
        return this.tracks.some(track => track.id === id);
    }
}