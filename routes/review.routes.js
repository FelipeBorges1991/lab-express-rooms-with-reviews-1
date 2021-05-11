const router = require("express").Router();

const RoomModel = require("../models/Room.model");
const ReviewModel = require("../models/Review.model");
const { route } = require("./room.routes");

//CREATE
router.post("/review", async (req, res) => {
  // Requisições do tipo POST tem uma propriedade especial chamada body, que carrega a informação enviada pelo cliente
  console.log(req.body);

  try {
    // Salva os dados do review no banco de dados (MongoDB) usando o body da requisição como parâmetro
    const result = await ReviewModel.create(req.body);

    const updatedRoom = await RoomModel.findOneAndUpdate(
        { _id: req.body.roomId },
        { $push: { reviews: result._id } },
        {new: true}
      );
  
      console.log( updatedRoom);
      console.log( result );


    // Responder o review recém-criado no banco para o cliente (solicitante). O status 201 significa Created
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    // O status 500 signifca Internal Server Error
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
  
});

router.get("/room/:id/review", async (req, res) => {
    try {
      const reviewsList = await RoomModel.findOne({
        _id: req.params.id,
      }).populate("reviews");
  
      return res.status(200).json(reviewsList);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  });
   

module.exports = router;