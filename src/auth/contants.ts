export const jwtConfig = {
    secret: 'topsecret51'
}

export const jwtConfig2 = () => ({
    config: {
        secret: process.env.JWT_SECRET,
    }
})