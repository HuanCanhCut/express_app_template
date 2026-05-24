import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

import { sequelize } from '../../config/database'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id?: number
    declare first_name: string
    declare last_name: string
    declare full_name?: string
    declare nickname: string
    declare academic_degree: string
    declare uuid: string
    declare email?: string
    declare password?: string
    declare avatar: string
    declare role: 'teacher' | 'student' | 'bot' | 'admin'
    declare is_active: boolean
    declare is_blocked: boolean
    declare blocked_by?: number | null
    declare blocked_at?: Date | null
    declare block_reason?: string | null
    declare created_at?: Date
    declare updated_at?: Date

    /**
     * Virtual fields
     */
    declare subject_count?: number
    declare textbook_count?: number
    declare reference_material_count?: number
    declare assignment_count?: number
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        full_name: {
            type: DataTypes.VIRTUAL,
            allowNull: true,
            get() {
                const full_name = `${this.first_name} ${this.last_name}`
                return full_name.trim()
            },
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        academic_degree: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Sinh viên',
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        },
        role: {
            type: DataTypes.ENUM('teacher', 'student', 'bot', 'admin'),
            allowNull: false,
            defaultValue: 'student',
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        is_blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        blocked_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        blocked_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        block_reason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['password', 'email'],
            },
        },
        scopes: {
            withPassword: {
                attributes: {
                    exclude: ['email'],
                },
            },
            withEmail: {
                attributes: {
                    exclude: ['password'],
                },
            },
        },
    },
)

export default User
