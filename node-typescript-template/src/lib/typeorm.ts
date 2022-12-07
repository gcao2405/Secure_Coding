import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "tutorial",
    password: "privatepassword",
    database: "iam",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})