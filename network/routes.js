const datos = require('../components/datos/network');

const routes = function(server) {
//    server.use('/user', user);
    // server.use('/view', view);
    server.use('/datos', datos);
}

module.exports = routes;