const express = require("express");
const cors = require("cors");
require("dotenv").config();

const crypto = require("crypto");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const secretKey = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});

app.post("/api/flow", async (req, res) => {
  const flowApiUrl = "https://sandbox.flow.cl/api/payment/create";

  try {
    const { amount, email, urlReturn, urlConfirmation } = req.body;

    // Valores de prueba
    const commerceOrder = "O21312adsasdsad231"; // Identificador único de la orden
    const subject = "Compra de prueba";
    const currency = "CLP";
    const paymentMethod = 9; // Todos los medios de pago

    const timeout = 300; // 5 minutos

    // Crear un objeto con los parámetros
    const parameters = {
      amount,
      apiKey,
      commerceOrder,
      currency,
      email,
      paymentMethod,
      subject,
      urlConfirmation,
      urlReturn,
      timeout,
    };

    // Ordenar los parámetros alfabéticamente por su nombre y crear el stringToSign
    const orderedStringToSign = Object.keys(parameters)
      .sort() // Ordenar los keys alfabéticamente
      .map((key) => `${key}${parameters[key]}`) // Concatenar key y valor
      .join(""); // Unir todo en un solo string

    console.log("String a firmar (ordenado):", orderedStringToSign);

    // Generar la firma HMAC
    const hmac = crypto.createHmac("sha256", secretKey);
    const signature = hmac.update(orderedStringToSign).digest("hex");
    console.log("Firma generada:", signature);

    // Crear los parámetros en formato x-www-form-urlencoded
    const params = new URLSearchParams({ ...parameters, s: signature });

    // Hacer la solicitud HTTP POST a la API de Flow
    const response = await axios.post(flowApiUrl, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Verificar el estado de la respuesta y manejarla
    if (response.status === 200) {
      const { url, token } = response.data;

      // **Aquí es donde agregamos el token a la urlReturn**
      const redirectUrl = `${url}?token=${token}&urlReturn=${encodeURIComponent(urlReturn)}`;


      console.log("URL de redirección con token", redirectUrl);

      // Responder con la URL de redirección
      res.json({ redirectUrl });
    } else {
      console.error("Error en la respuesta de Flow:", response.data);
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error("Error al interactuar con la API de Flow:", error.message);
    res.status(500).json({ error: "Error al crear la orden de pago" });
  }
});





// Endpoint para obtener el estado del pago (GET)
app.get('/payment/getStatus', async (req, res) => {
  const { token } = req.query;

  // Valida los parámetros requeridos
  if (!apiKey || !token) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    // Construye la URL para el endpoint de Flow
    const url = `https://sandbox.flow.cl/api/payment/getStatus`;

    // Realiza la solicitud al servicio de Flow
    const response = await axios.get(url, {
      params: { apiKey, token },
    });

    // Devuelve la respuesta de Flow al cliente
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error communicating with Flow:', error.message);

    // Maneja errores
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});
