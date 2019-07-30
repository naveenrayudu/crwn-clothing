"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const stripe_1 = __importDefault(require("stripe"));
const app = express_1.default();
const port = process.env.PORT || 3001;
const stripeApp = new stripe_1.default(process.env.STRIPE_KEY);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(compression_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "client", "build")));
if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        if (req.header("x-forwarded-proto") !== "https") {
            res.redirect(`https://${req.header("host")}${req.url}`);
        }
        else {
            next();
        }
    });
}
app.post("/api/paypal/payment", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield stripeApp.charges.create({
            amount: req.body.amount,
            currency: "usd",
            source: req.body.token,
        });
        return res.send({
            isSuccess: true,
        });
    }
    catch (error) {
        return res.send({
            errorMessage: error,
            isSuccess: false,
        });
    }
}));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// All non-found urls.
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "client", "build", "index.html"));
});
app.listen(port, () => {
    console.log("Node server started");
});
//# sourceMappingURL=index.js.map