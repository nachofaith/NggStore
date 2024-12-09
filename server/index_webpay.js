const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();
const {
  WebpayPlus,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} = require("transbank-sdk"); // ES6

const router = express.Router();

//ROUTES

const webpayRoutes = require("./routes/webpayRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/webpay", webpayRoutes);

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});

const webpay = new WebpayPlus.Transaction();

app.post("/api/webpay/create-transaction", async (req, res) => {
  try {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    // Crea la transacción en Webpay
    const createResponse = await webpay.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    // Responde con el token y la URL que el cliente necesita para redirigir
    res.json({
      token: createResponse.token,
      url: createResponse.url,
    });
  } catch (error) {
    console.error("Error al crear la transacción en Webpay:", error);
    res.status(500).json({ error: "Error al crear la transacción en Webpay" });
  }
});
