const express = require("express");
const router = express.Router();
const {
  WebpayPlus,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} = require("transbank-sdk");

// Define la ruta POST para confirmar la transacción
router.post("/confirm-transaction", async (req, res) => {
  const { token } = req.body; // Obtén el token de la solicitud

  // const WEBPAY_PLUS = "597052687100"; // Código de comercio de integración
  // const WEBPAY =
  //   "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"; // Clave API de integración

  try {
    // Crear una instancia de la transacción con las opciones de integración
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration // Ambiente de integración
      )
    );

    // Confirmar la transacción usando el token
    const response = await tx.commit(token);

    // Verifica si la transacción fue exitosa (response_code === 0 y status === 'AUTHORIZED')
    if (response.response_code === 0 && response.status === "AUTHORIZED") {
      // Devolver detalles de la transacción al cliente
      res.json({
        vci: response.vci,
        amount: response.amount,
        status: response.status,
        buy_order: response.buy_order,
        session_id: response.session_id,
        card_detail: response.card_detail,
        accounting_date: response.accounting_date,
        transaction_date: response.transaction_date,
        authorization_code: response.authorization_code,
        payment_type_code: response.payment_type_code,
        response_code: response.response_code,
        installments_amount: response.installments_amount,
        installments_number: response.installments_number,
        balance: response.balance,
      });
    } else {
      res.status(400).json({ message: "Transacción no autorizada" });
    }
  } catch (error) {
    console.error("Error al confirmar la transacción:", error);
    res.status(500).json({ message: "Error al confirmar la transacción" });
  }
});

module.exports = router;
