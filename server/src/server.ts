const http = require("http");

const serverCreated = http.createServer((req, res) => {
    res.end("Day two of learning node js");
});

serverCreated.listen(3000);