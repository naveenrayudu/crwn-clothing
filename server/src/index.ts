import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

app.get("/api/paypal/payment", (req, res) => {
    return res.send("Paypal transactions");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// All non-found urls.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log("Node server starteda");
});
