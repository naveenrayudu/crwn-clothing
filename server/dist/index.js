"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = process.env.PORT || 3001;
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "client", "build")));
app.get("/api/paypal/payment", (req, res) => {
    return res.send("Paypal transactions");
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// All non-found urls.
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "client", "build", "index.html"));
});
app.listen(port, () => {
    console.log("Node server starteda");
});
//# sourceMappingURL=index.js.map