const { connect, connection } = require("mongoose");

const dbURL = "mongodb://localhost/socialMediaDB";

connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
