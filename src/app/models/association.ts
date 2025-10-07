import RefreshToken from './RefreshTokenModel'
import User from './UserModel'

const associations = () => {
    // define relations
    User.hasMany(RefreshToken, { foreignKey: 'user_id' })
    RefreshToken.belongsTo(User, { foreignKey: 'user_id' })
}

export default associations
