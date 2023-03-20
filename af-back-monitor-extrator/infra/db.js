const mongoose = require('mongoose');

const connect = (mongo_url) => {  
  mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });  
}

const disconnect = async () => {
  mongoose.connection.close();
}

module.exports = { connect , disconnect} ;