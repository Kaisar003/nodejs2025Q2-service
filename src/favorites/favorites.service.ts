// src/favorites/favorites.service.ts
import { Injectable, NotFoundException, UnprocessableEntityException, Inject, forwardRef } from '@nestjs/common';
import { Favorites, FavoritesResponse } from '../types/interfaces';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
    private favorites: Favorites = {
        artists: [],
        albums: [],
        tracks: [],
    };

    constructor(
        @Inject(forwardRef(() => ArtistService))
        private artistService: ArtistService,
        @Inject(forwardRef(() => AlbumService))
        private albumService: AlbumService,
        @Inject(forwardRef(() => TrackService))
        private trackService: TrackService,
    ) { }

    findAll(): FavoritesResponse {
        const favoriteArtists = this.favorites.artists
            .map(id => {
                try {
                    return this.artistService.findOne(id);
                } catch {
                    return null;
                }
            })
            .filter(artist => artist !== null);

        const favoriteAlbums = this.favorites.albums
            .map(id => {
                try {
                    return this.albumService.findOne(id);
                } catch {
                    return null;
                }
            })
            .filter(album => album !== null);

        const favoriteTracks = this.favorites.tracks
            .map(id => {
                try {
                    return this.trackService.findOne(id);
                } catch {
                    return null;
                }
            })
            .filter(track => track !== null);

        return {
            artists: favoriteArtists,
            albums: favoriteAlbums,
            tracks: favoriteTracks,
        };
    }

    addArtist(id: string): void {
        if (!this.artistService.exists(id)) {
            throw new UnprocessableEntityException('Artist does not exist');
        }

        if (!this.favorites.artists.includes(id)) {
            this.favorites.artists.push(id);
        }
    }

    removeArtist(id: string): void {
        const index = this.favorites.artists.indexOf(id);
        if (index === -1) {
            throw new NotFoundException('Artist is not in favorites');
        }
        this.favorites.artists.splice(index, 1);
    }

    addAlbum(id: string): void {
        if (!this.albumService.exists(id)) {
            throw new UnprocessableEntityException('Album does not exist');
        }

        if (!this.favorites.albums.includes(id)) {
            this.favorites.albums.push(id);
        }
    }

    removeAlbum(id: string): void {
        const index = this.favorites.albums.indexOf(id);
        if (index === -1) {
            throw new NotFoundException('Album is not in favorites');
        }
        this.favorites.albums.splice(index, 1);
    }

    addTrack(id: string): void {
        if (!this.trackService.exists(id)) {
            throw new UnprocessableEntityException('Track does not exist');
        }

        if (!this.favorites.tracks.includes(id)) {
            this.favorites.tracks.push(id);
        }
    }

    removeTrack(id: string): void {
        const index = this.favorites.tracks.indexOf(id);
        if (index === -1) {
            throw new NotFoundException('Track is not in favorites');
        }
        this.favorites.tracks.splice(index, 1);
    }
}