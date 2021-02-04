import { createServer } from "http";
import socketio from "socket.io";
import * as express from "express";
import { text } from "body-parser";

const app = express();
const server = createServer(app);

const io = socketio(server);

app.use(text({ type: "*/*" }));

app.get("/", (req, res) => res.send("Received a GET HTTP method"));
app.get("/robots.txt", (req, res) =>
  res.send("User-agent: *\nDisallow: /deny\n")
);
app.get("/json", (req, res) => res.send(`{"slideshow": {}}`));
app.get("/redirect-to", (req, res) => res.redirect(req.query.url));
app.get("/status/201", (req, res) => {
  res.statusMessage = "CREATED";
  return res.status(201).send();
});

app.post("/", (req, res) => res.send(req.body));
app.post("/anything", (req, res) =>
  res.json({ method: "POST", data: req.body })
);

app.put("/", (req, res) => res.send("Received a PUT HTTP method"));

app.delete("/", (req, res) => res.send("Received a DELETE HTTP method"));

function startServer(port) {
  io.on("connection", (socketServer) => {
    socketServer.on("npmStop", () => {
      console.log("Dummy server stopped");
      process.exit(0);
    });
  });
  server.listen(port, () =>
    console.log(`Dummy server is listening on port ${port}!`)
  );
}

export default {
  startServer,
};
