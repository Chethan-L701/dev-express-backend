const express = require("express");

const PORT = 5000;
let server = express();

server.get("/", (request, response) => {
    return response.status(200).send({
        message: "Request Successfull",
    });
});

const bookroute = require("./routes/bookRoute");
server.use("/book", bookroute);

server.listen(PORT, () => {
    console.log(`listening to the port :${PORT} at localhost`);
});
