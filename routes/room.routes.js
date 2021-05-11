const router = require("express").Router();

const RoomModel = require("../models/Room.model");

//CREATE
router.post("/rooms", async (req, res) => {
  // Requisições do tipo POST tem uma propriedade especial chamada body, que carrega a informação enviada pelo cliente
  console.log(req.body);

  try {
    // Salva os dados do quarto no banco de dados (MongoDB) usando o body da requisição como parâmetro
    const result = await RoomModel.create(req.body);

    // Responder o quarto recém-criado no banco para o cliente (solicitante). O status 201 significa Created
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    // O status 500 signifca Internal Server Error
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//FIND ALL
router.get("/rooms", async (req, res) => {
  try {
    const result = await RoomModel.find();

    console.log(result);

    if (result) {
      // Responder o cliente com os dados do quarto. O status 200 significa OK
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ msg: "Room not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//UPDATE
router.put("/rooms/:id", async (req, res) => {
  try {
    // Extrair o id do usuário do parâmetro de rota
    const { id } = req.params;

    // Atualizar esse usuário específico no banco
    const result = await RoomModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    console.log(result);

    // Caso a busca não tenha encontrado resultados, retorne 404
    if (!result) {
      return res.status(404).json({ msg: "Product not found." });
    }

    // Responder com o usuário atualizado para o cliente
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//DELETE
router.delete("/rooms/:id", async (req, res) => {
  try {
    // Extrair o id do usuário do parâmetro de rota
    const { id } = req.params;

    // Deletar o usuário no banco
    const result = await RoomModel.deleteOne({ _id: id });

    console.log(result);

    // Caso a busca não tenha encontrado resultados, retorne 404
    if (result.n === 0) {
      return res.status(404).json({ msg: "Room not found." });
    }

    // Por convenção, em deleções retornamos um objeto vazio para descrever sucesso
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

module.exports = router;
