const constants = {
  DATABASE_URI: process.env.DATABASE_URI,

  DATABASES: {
    ROOM: "room",
    ROOM_TYPE: "room_type",
  },

  MESSAGES: {
    FETCHED: "Resources fetched successfully",
    UPDATED: "Resources updated successfully",
    ERROR: "Resources error",
    CREATED: "Resources created successfully",
    DELETED: "Resources created successfully",
  },
};

module.exports = constants;
