const http = require("http");
const app = require("./app");

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`================================`);
    console.log(`Server is listening on port ${PORT}`);
    console.log(`================================`);
});
