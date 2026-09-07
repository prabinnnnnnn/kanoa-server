import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { db as sequelize } from "../../config/db.js";
import { AlbumAttributes } from "./album.types.js";

export class Album extends Model<InferAttributes<Album>, InferCreationAttributes<Album>> implements AlbumAttributes {
    declare id: string;
    declare title: string;
    declare coverImage: string | null;
    declare artistId: string;
    declare releaseDate: Date | null;
}

Album.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        artistId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "albums",
        timestamps: true,
    }
);