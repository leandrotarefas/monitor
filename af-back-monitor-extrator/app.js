const mongo_url = 'mongodb://tarefas:tarefas@localhost:27017/monitor'
require("./infra/db").connect(mongo_url);
const app = require('./server')();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

