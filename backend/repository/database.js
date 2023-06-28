import dotenv from 'dotenv';
import { createConnection } from 'mysql';

dotenv.config()
var connection = createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD
});
 
connection.connect();
 
export default connection;