import { Request, Response } from "express";
import { AlbumService } from "../../modules/album/album.service.js";
import { AlbumRepository } from "../../modules/album/album.repository.js";
import { ArtistRepository } from "../../modules/artist/artist.repository.js";
import { ArtistService } from "../../modules/artist/artist.service.js";


class AlbumPage {

    private albums = new AlbumService(new AlbumRepository);
    private artists = new ArtistService(new ArtistRepository);

    renderAlbumListPage = async (req: Request, res: Response) => {

        res.render("album/album-list.ejs", {
            title: 'Album List',
            page_title: 'Albums',
            messages: req.flash(),
            albums: await this.albums.getAll()
        })
    }

    renderAlbumCreatePage = async (req: Request, res: Response) => {

        res.render("album/album-create.ejs", {
            title: 'Album List',
            page_title: 'Albums',
            messages: req.flash(),
            artists: await this.artists.getAll()
        })
    }


    renderAlbumEditPage = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const data = await this.albums.getById(id);

        res.render("album/album-edit.ejs", {
            title: 'Album Edit',
            page_title: 'Albums Edit',
            messages: req.flash(),
            artists: await this.artists.getAll(),
            data,
        })
    }

}

export default AlbumPage;