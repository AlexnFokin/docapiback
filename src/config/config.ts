import dotenv from 'dotenv';

dotenv.config()

interface Config {
    port: number,
    nodeEnv: string,
}

const config: Config = {
    port: Number(process.env.APP_PORT || 5000),
    nodeEnv: process.env.NODE_ENV || 'development',
}

export const jwt_secret = process.env.JWT_SECRET || 'default_secret';

export default config;