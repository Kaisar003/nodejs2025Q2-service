// src/artist/dto/create-artist.dto.ts
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    grammy: boolean;
}