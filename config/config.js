require('dotenv').config();

//-----------CONFIG--------//

//fill up the enviroment variables into `.env` file.

const config = {
    dbUrl: process.env.DB_URL || 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME,
    hostApp: process.env.HOST_APP || 'http://localhost',
    portApp: process.env.PORT_APP || 3000,
};

module.exports = config;