import path from "path"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "arjuna.db.elephantsql.com",
  port: 5432,
  password: "zVfxlCO3PuXyBzU_GVxSNGa6X3bIMMsk",
  username: "qzyhclzn",
  database: "qzyhclzn",
  entities: [path.resolve(__dirname, "..", "entities", "*.entitiy.{ts,js}")],
  migrations: [path.resolve(__dirname, "..", "migrations", "**/*.{ts,js}")],
  logging: true,
  synchronize: false,
})

const SECRET_KEY = String(process.env.SECRET_KEY) || "(*‿*)"

export { AppDataSource, SECRET_KEY }
