import { Pool } from "pg";
import config from "config";

export const pool = new Pool({
  connectionString: config.get("database_url"),
});

// import config from "config";

// let pool: Pool;

export const init = async () => {
 try {
   await pool.connect()
   console.log("connected to db")
 } catch (e) {
  console.log(e)
 }
  

  // try {
  //   pool = createPool({
  //     host: config.get("db_host"),
  //     user: config.get("db_user"),
  //     password: config.get("password"),
  //     database: config.get("database"),
  //     port: Number(config.get("port")),
  //   });
  //   console.debug("MySQL DB connected successfully");
  // } catch (error) {
  //   console.error("Mysql Connection Error", error);
  //   throw new Error("failed to connect");
  // }
};

export const execute = <T>(
  query: string,
  params: {}[]
): Promise<T> => {
  try {
    if (!pool)
      throw new Error(
        "My Sql Pool was not created. Ensure pool is created when running the app"
      );
    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error: any, results: any) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error("mysql connection error: ", error);
    throw new Error("failed to execute MySQL query");
  }
};
