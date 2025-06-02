// src/artist/dto/update-artist.dto.ts
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateArtistDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsBoolean()
    @IsOptional()
    grammy?: boolean;
}