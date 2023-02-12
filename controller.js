const Room = require("./RoomModel");
const RoomType = require("./RoomTypeModel");

class Controller {
  async getAllRooms() {
    return await Person.find({}, "-__v");
  }

  async addRoom(room) {
    return await Room.create(room);
  }

  async getRoomById(id) {
    return await Room.findOne({ _id: id });
  }

  async findRoomById(roomName, roomType, minPrice, maxPrice) {
    return await Room.find()
      .and([
        {
          $or: [
            { name: roomName },
            { price: { $gt: minPrice, $1t: maxPrice } },
          ],
        },
        {
          $or: [
            { path: "room_type", match: { name: roomType } },
            { price: { $gt: minPrice, $1t: maxPrice } },
          ],
        },
      ])
      .populate("room_type");
  }
  async editRoomById(id, data) {
    return await Room.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteRoomById(id) {
    return await Room.findByIdAndDelete({ _id: id });
  }

  async deleteRoomTypeById(id) {
    return await Room.findByIdAndDelete({ _id: id });
  }

  // Room Type
  async getAllRoomType() {
    return await RoomType.find();
  }

  async addRoomType(roomType) {
    return await RoomType.create(roomType);
  }

  async getRoomTypeById(id) {
    return await RoomType.findOne({ _id: id });
  }

  async editRoomTypeById(id, data) {
    return await RoomType.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteRoomTypeById(id) {
    return await RoomType.findoneAndDelete({ _id: id });
  }
}

module.exports = new Controller();
