import { registerAs } from '@nestjs/config';
import {config} from 'dotenv';
config({path: '.env.development'});
import { DataSource, DataSourceOptions } from "typeorm";

export const AppDataSource: DataSourceOptions = ({
    type: 'postgres',
    host: process.env.DB_HOST_DOCKER || 'postgres',
    port: parseInt(process.env.DB_PORT_DOCKER!, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: ['dist/**/*.entity{.js,.ts}'], // busca automaticamente todas las entidades del proyecto.
    migrations: ['dist/migrations/*{.ts,.js}'],
    ssl: true,
});

export const postgresDataSourceConfig = registerAs(
    'postgres', //Este es un alias que puede tener cualquier nombre.
    () => AppDataSource,
);

export const PostgresDataSource = new DataSource(AppDataSource);