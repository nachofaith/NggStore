const db = require("../config/db");

// CREATE SHIPPING
const createShipping = (req, res) => {
  const { nameShip, descShip, priceShip, typeShip } = req.body;

  if (!nameShip || !priceShip) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  const query =
    "INSERT INTO shipping (nameShipp, descShipp, priceShipp, typeShipp) VALUES (?,?,?,?)";

  db.execute(query, [nameShip, descShip, priceShip, typeShip], (err, result) => {
    if (err) {
      return res.status(500).send("Error al registrar el tipo de envío");
    }
    res.status(201).send("Tipo de envío registrado exitosamente");
  });
};

// READ SHIPPING
const readShipping = (req, res) => {
  const query = "SELECT * FROM shipping";
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener los tipos de envío" });
    }
    return res.status(200).json(results);
  });
};

// READ SHIPPING BY ID
const readShippingById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("El ID del tipo de envío es obligatorio");
  }

  const query = "SELECT * FROM shipping WHERE idShipp = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener el tipo de envío" });
    }

    if (results.length === 0) {
      return res.status(404).send("Tipo de envío no encontrado");
    }

    return res.status(200).json(results[0]);
  });
};

// UPDATE SHIPPING
const updateShipping = (req, res) => {
  const { id } = req.params;
  const { nameShip, descShip, priceShip, typeShip } = req.body;

  if (!id || !nameShip || !priceShip) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  const query =
    "UPDATE shipping SET nameShipp = ?, descShipp = ?, priceShipp = ?, typeShipp = ? WHERE idShipp = ?";

  db.execute(query, [nameShip, descShip, priceShip, typeShip, id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al actualizar el tipo de envío");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Tipo de envío no encontrado");
    }

    res.status(200).send("Tipo de envío actualizado exitosamente");
  });
};

// DELETE SHIPPING
const deleteShipping = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send("El ID del tipo de envío es obligatorio");
  }

  const query = "DELETE FROM shipping WHERE idShipp = ?";

  db.execute(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al eliminar el tipo de envío");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Tipo de envío no encontrado");
    }

    res.status(200).send("Tipo de envío eliminado exitosamente");
  });
};

module.exports = {
  createShipping,
  readShipping,
  readShippingById,
  updateShipping,
  deleteShipping,
};
