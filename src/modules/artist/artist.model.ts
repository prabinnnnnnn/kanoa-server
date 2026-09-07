import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

import { db as sequelize } from "../../config/db.js";
import { ArtistAttributes } from "./artist.types.js";

export class Artist extends Model<InferAttributes<Artist>, InferCreationAttributes<Artist>> implements ArtistAttributes {
    declare id: CreationOptional<string>;
    declare name: string;
    declare slug: string;
    declare bio: string;
    declare genre: string | null;
    declare image: string;
    declare coverImage: string;
    declare content: string;
}

Artist.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: "artists",
        timestamps: true,
    }
);