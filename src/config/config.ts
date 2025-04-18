import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: Number(process.env.APP_PORT || 5000),
    nodeEnv: process.env.NODE_ENV || 'development',
};

export const jwt_secret = process.env.JWT_SECRET || 'default_secret';
export const jwt_access_secret =
    process.env.JWT_ACCESS_SECRET || 'access_secret';
export const jwt_refresh_secret =
    process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export const smtp_host = process.env.SMTP_HOST || 'smtp_host';
export const smtp_port = process.env.SMTP_PORT || 'smtp_port';
export const smtp_user = process.env.SMTP_USER || 'smtp_user';
export const smtp_password = process.env.SMTP_PASSWORD || 'smtp_password';
export const api_url = process.env.API_URL || 'api_url'
export const client_url = process.env.CLIENT_URL || 'client_url'

export default config;
