// src/album/dto/create-album.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    year: number;

    @IsOptional()
    @IsUUID()
    artistId?: string | null;
}
