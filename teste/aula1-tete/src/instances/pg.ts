import { Sequelize } from 'sequelize'; 
import database from './database';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    database.db,
    database.user,
    database.password,
    {
        dialect: 'mysql',
        port: database.port
    }
);