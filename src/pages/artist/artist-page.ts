import { Request, Response } from "express";
import { ArtistRepository } from "../../modules/artist/artist.repository.js";


class ArtistPage {

    private artists = new ArtistRepository();

    renderArtistListPage = async (req: Request, res: Response) => {
        res.render("artist/artist-list.ejs", {
            title: 'Artist List',
            page_title: 'Artists',
            messages: req.flash(),
            artists: await this.artists.getAll()
        })
    }

    renderArtistCreatePage = async (req: Request, res: Response) => {
        res.render("artist/artist-create.ejs", {
            title: 'Create Artist',
            page_title: 'Create Artists',
            messages: req.flash(),
        })
    }

    renderArtistEditPage = async (req: Request<{ id: string }>, res: Response) => {

        const { id } = req.params;
        const artist = await this.artists.getById(id)

        res.render("artist/artist-edit.ejs", {
            title: 'Edit Artist',
            page_title: 'Edit Artists',
            messages: req.flash(),
            artist
        })
    }
}

export default ArtistPage;