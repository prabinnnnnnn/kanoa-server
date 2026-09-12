import { Router } from "express";
import { renderDashboard } from "../pages/dashboard/dashboard-page.js";
import AlbumPage from "../pages/album/album-page.js";
import ArtistPage from "../pages/artist/artist-page.js";
import SongPage from "../pages/song/song-page.js";
import { AuthPage } from "../pages/auth/auth-page.js";

const router = Router();

const albumPage = new AlbumPage()
const artistPage = new ArtistPage()
const songPage = new SongPage()

const authPage = new AuthPage()

router.get("", renderDashboard);

// Album Page Route
router.get("/albums", albumPage.renderAlbumListPage);
router.get("/albums/add", albumPage.renderAlbumCreatePage);
router.get("/albums/edit/:id", albumPage.renderAlbumEditPage);

// Artist Page Route
router.get("/artists", artistPage.renderArtistListPage);
router.get("/artists/add", artistPage.renderArtistCreatePage);
router.get("/artists/edit/:id", artistPage.renderArtistEditPage);

// Song Page Route
router.get("/songs", songPage.renderSongListPage);
router.get("/songs/add", songPage.renderSongCreatePage);
router.get("/songs/edit/:id", songPage.renderSongEditPage);

// Auth Page Route
router.get("/auth/login", authPage.renderLoginPage)
router.get("/auth/register", authPage.renderRegisterPage)
router.get("/auth/profile", authPage.renderProfilePage)

export default router;