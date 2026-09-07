import { Router } from "express";
import { renderDashboard } from "../pages/dashboard/dashboard-page.js";
import AlbumPage from "../pages/album/album-page.js";
import ArtistPage from "../pages/artist/artist-page.js";

const router = Router();

const albumPage = new AlbumPage()
const artistPage = new ArtistPage()

router.get("", renderDashboard);
router.get("/albums", albumPage.renderAlbumListPage);
router.get("/albums/add", albumPage.renderAlbumCreatePage);
router.get("/artists", artistPage.renderArtistListPage);
router.get("/artists/add", artistPage.renderArtistCreatePage);
router.get("/artists/edit/:id", artistPage.renderArtistEditPage);

export default router;