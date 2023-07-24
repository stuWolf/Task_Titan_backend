var {app, port} = require('./serverConfig');

// Separate the "app.listen" from the rest of the server config & setup.
// This allows us to simplify how the server unit testing is gonna work.
const server = app.listen(port, () => {
    console.log(`    
    ExpressJS server is now running!
    Server address mapping is:
    
    PORT: ${port}
    Congrats!
    `);
})