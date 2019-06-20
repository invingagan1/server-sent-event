const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const PORT = process.PORT || 80;

app.use("/", express.static("public", {
    index: "index.html"
}));

app.get("/sse", (req, res) => {
    res.status(200).set({
        "connection": "keep-alive",
        "catch-control": "no-cache",
        "content-type": "text/event-stream"
    });
    setInterval(() => {
        const d = { name: "info", time: Date.now() }
        res.write('data: ' + JSON.stringify(d) + ' \n\n');
    }, 1000);
})

server.listen(PORT, () => {
    console.log(`server has started at ${PORT}`);
})