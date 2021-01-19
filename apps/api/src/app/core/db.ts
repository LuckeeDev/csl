import * as mongoose from 'mongoose';
import { environment as env } from '@environments/environment';

export function setupDB() {
  mongoose.connect(env.DB_URI, {
    // Avoid deprecation warning
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  
  mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${env.DB_URI}`);
  });
  
  mongoose.connection.on('error', (err: any) => {
    console.log(`Database error: ${err}`);
  });
}
