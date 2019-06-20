# server-sent-event
A demo for server send event. It has 2 pasts.
1. Server code: An example of api for server sent event
2. Client code: How to consume that api.


## Server
It is using express to create server and its mechanism to create api.

```
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
```

## Client
It will explain the JS code to consume the api.

```
var main = {
    init: function () {
        console.log('app started');
        this.listenForServerEvent();
    },
    listenForServerEvent: function () {
        console.log("listen for server event");
        var listener = new EventSource("/sse");
        listener.onmessage = function (data) {
            console.log(JSON.parse(data.data));
        }
    }

}
window.addEventListener("load", main.init.bind(main));
```