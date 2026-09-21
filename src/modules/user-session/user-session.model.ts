import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../../config/db.js";

export class UserSession extends Model<InferAttributes<UserSession>, InferCreationAttributes<UserSession>> {
    declare id: CreationOptional<string>;

    declare userId: string;

    declare refreshTokenHash: string;

    declare userAgent: string | null;
    declare ipAddress: string | null;

    declare expiresAt: Date;
    declare revokedAt: Date | null;
}

UserSession.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,

        references: {
            model: "users",
            key: "id",
        },

        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    refreshTokenHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userAgent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    revokedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: db,
    timestamps: true,
    tableName: "user_sessions",
    modelName: "UserSession"
})