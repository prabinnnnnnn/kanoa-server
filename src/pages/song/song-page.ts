import { Request, Response } from "express";
import { AlbumRepository } from "../../modules/album/album.repository.js";
import { ArtistRepository } from "../../modules/artist/artist.repository.js";
import { AlbumService } from "../../modules/album/album.service.js";
import { ArtistService } from "../../modules/artist/artist.service.js";
import { SongRepository } from "../../modules/song/song.repository.js";
import { SongService } from "../../modules/song/song.service.js";


class SongPage {

    private albums = new AlbumService(new AlbumRepository);
    private artists = new ArtistService(new ArtistRepository);
    private songs = new SongService(new SongRepository);

    renderSongListPage = async (req: Request, res: Response) => {

        const songs = await this.songs.getAll()
        console.log(songs)

        res.render("song/song-list.ejs", {
            title: 'Song List',
            page_title: 'Songs',
            messages: req.flash(),
            albums: await this.albums.getAll(),
            artists: await this.artists.getAll(),
            songs: songs ?? [],
        })
    }

    renderSongCreatePage = async (req: Request, res: Response) => {

        res.render("song/song-create.ejs", {
            title: 'Song List',
            page_title: 'Songs',
            messages: req.flash(),
            albums: await this.albums.getAll(),
            artists: await this.artists.getAll(),
            songs: await this.songs.getAll(),
        })
    }


    renderSongEditPage = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const data = await this.songs.getById(id)
        res.render("song/song-edit.ejs", {
            title: 'Song Edit',
            page_title: 'Songs Edit',
            messages: req.flash(),
            albums: await this.albums.getAll(),
            artists: await this.artists.getAll(),
            data,
        })
    }

}

export default SongPage;