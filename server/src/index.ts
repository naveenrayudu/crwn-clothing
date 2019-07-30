import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import path from "path";
import stripe from "stripe";

const app = express();
const port = process.env.PORT || 3001;
const stripeApp = new stripe(process.env.STRIPE_KEY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        if (req.header("x-forwarded-proto") !== "https") {
            res.redirect(`https://${req.header("host")}${req.url}`);
        } else {
            next();
        }
    });
}

app.post("/api/paypal/payment", async (req, res) => {
    try {
        const response = await stripeApp.charges.create({
            amount: req.body.amount,
            currency: "usd",
            source: req.body.token,
        });
        return res.send({
            isSuccess: true,
        });
    } catch (error) {
        return res.send({
            errorMessage: error,
            isSuccess: false,
        });
    }

});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// All non-found urls.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log("Node server started");
});
