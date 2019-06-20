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