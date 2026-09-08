import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { db as sequelize } from "../../config/db.js";
import { SongAttributes } from "./song.types.js";

export class Song extends Model<InferAttributes<Song>, InferCreationAttributes<Song>> implements SongAttributes {
    declare id: CreationOptional<string>;
    declare title: string;
    declare slug: string;
    declare duration: number | null;
    declare audioUrl: string;
    declare coverImage: string | null;
    declare image: string | null;
    declare isPopular: boolean;
    declare isTrending: boolean;
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
        slug: {
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
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isPopular: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isTrending: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        albumId: {
            type: DataTypes.UUID,
            allowNull: true,
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