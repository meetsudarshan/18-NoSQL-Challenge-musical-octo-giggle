const { connect, connection } = require("mongoose");

const con =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mySocialNetworkDB";
connect(con);

module.exports = connection;