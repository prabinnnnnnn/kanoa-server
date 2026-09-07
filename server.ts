import app from './src/app.js';
import { connectDatabase } from './src/config/db.js';
import env from './src/config/env.js';

process.env.TZ = 'UTC';


(async () => {
    await connectDatabase();
    app.listen(env.PORT, env.HOST, () => console.log(`Server running at http://${env.HOST}:${env.PORT}`));
})();