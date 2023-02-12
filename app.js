const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const constants = require("./constants");
const database = require("./database");
const Controller = require("./controller");
app = express();
const { MESSAGES } = constants;

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//base api
app.get("/", (req, res) => {
  res.status(200).send({ message: MESSAGES.FETCHED, success: true });
});
// GET section //
//fetch all rooms
app.get("/api/v1/rooms", async (req, res) => {
  try {
    const rooms = await Controller.getAllRooms();
    res.status(200).send({ message: MESSAGES.FETCHED, success: true, rooms });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch particular room with its id
app.get("/api/v1/rooms/:id", async (req, res) => {
  try {
    const data = await Controller.getRoomById(req.params.id);
    res.status(200).send({ message: MESSAGES.FETCHED, success: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

//fetch particular room with its roomname or roomtype or minPrice or maxPrice
app.get("/api/v1/room-search", async (req, res) => {
  let roomName = req.query.roomName;
  let roomType = req.query.roomType;
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;

  if (roomName === undefined) {
    roomName = "";
  }

  if (roomType === undefined) {
    roomType = "";
  }

  if (minPrice === undefined) {
    minPrice = 0;
  }

  if (maxPrice === undefined) {
    maxPrice = 77777777777777777777;
  }
  try {
    //const { id } = req.params;
    const data = await Controller.findRoom(
      roomName,
      roomType,
      minPrice,
      maxPrice
    );
    res.status(200).send({ message: MESSAGES.FETCHED, success: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch all room types

app.get("/api/v1/room-types", async (req, res) => {
  try {
    const roomTypes = await Controller.getAllRoomTypes();
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: roomTypes });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch particular room with its id
app.get("/api/v1/room-type/:id", async (req, res) => {
  try {
    const roomType = await Controller.getRoomTypeById(req.params.id);
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: roomType });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

/////////// post method ///////////////////////////////////
// create a room type ////////////////////
app.post("/api/v1/room-type", async (req, res) => {
  try {
    const data = await Controller.addRoomType(req.body);
    res.status(201).send({ message: MESSAGES.CREATED, suceess: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, suceess: false });
  }
});

/// creata a room
app.post("/api/v1/room", async (req, res) => {
  try {
    const data = await Controller.addRoom(req.body);
    res.status(201).send({ message: MESSAGES.CREATED, suceess: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, suceess: false });
  }
});

////////////////////Patch Method//////////////////////////////////////////////
/// edit a particular room
app.patch("/api/v1/room/:roomId", async (req, res) => {
  try {
    const data = await Controller.editRoomById(req.params.roomId);
    res.send(201).send({ message: MESSAGES.UPDATED, suceess: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, suceess: false });
  }
});

///// edit a particular room type
app.patch("/api/v1/room-type/:roomTypeId", async (req, res) => {
  try {
    const data = await Controller.editRoomTypeById(req.params.roomTypeId);
    res.send(201).send({ message: MESSAGES.UPDATED, suceess: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, suceess: false });
  }
});

/////////////////////// Delete Method///////////////////////////////////////////////////////
app.delete("/api/v1/room/:roomId", async (req, res) => {
  try {
    const data = await Controller.deleteRoomById(req.params.roomId);
    res.send(200).send({ message: MESSAGES.DELETED, suceess: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, suceess: false });
  }
});

app.delete("/api/v1/room-type/:roomTypeId", async (req, res) => {
  try {
    const data = await Controller.deleteRoomTypeById(req.params.roomTypeId);
    res.send(201).send({ message: MESSAGES.DELETED, suceess: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, suceess: false });
  }
});

app.listen(PORT, () => {
  //Start up the server
  database();

  console.log(`server started on port: ${PORT}`);
});

module.exports = app;
