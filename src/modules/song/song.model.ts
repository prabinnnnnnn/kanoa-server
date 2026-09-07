import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { db as sequelize } from "../../config/db.js";
import { SongAttributes } from "./song.types.js";

export class Song extends Model<InferAttributes<Song>, InferCreationAttributes<Song>> implements SongAttributes {
    declare id: string;
    declare title: string;
    declare duration: number | null;
    declare audioUrl: string;
    declare coverImage: string | null;
    declare albumId: string;
    declare artistId: string;
}

Song.init(
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
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        audioUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        albumId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        artistId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "songs",
        timestamps: true,
    }
);