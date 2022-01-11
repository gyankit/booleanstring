module.exports = {
    normalizePort: (val) => {
        const port = parseInt(val, 10);
        if (isNaN(port)) return val;
        if (port >= 0) return port;
        return false;
    },

    onError: (error) => {
        if (error.code == 'EADDRINUSE') {
            console.warn(port + ' is already in use');
        } else {
            console.warn('Error in Server Connection');
        }
        console.error(error);
        server.close();
        process.exit(1);
    }
};