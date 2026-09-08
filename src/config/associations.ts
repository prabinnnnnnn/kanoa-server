import { Artist } from "../modules/artist/artist.model.js";
import { Album } from "../modules/album/album.model.js";
import { Song } from "../modules/song/song.model.js";

Artist.hasMany(Album, { foreignKey: "artistId", as: "albums" });
Album.belongsTo(Artist, { foreignKey: "artistId", as: "artist" });

Album.hasMany(Song, { foreignKey: "albumId", as: "songs" });
Song.belongsTo(Album, { foreignKey: "albumId", as: "album" });

Artist.hasMany(Song, { foreignKey: "artistId", as: "songs" });
Song.belongsTo(Artist, { foreignKey: "artistId", as: "artist" });


export {
    Artist, Album, Song
}