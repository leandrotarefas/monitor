const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Conecte-se ao MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Defina os esquemas do Mongoose
const agn2InsSchema = new Schema({ data: Object });
const agn2OutsSchema = new Schema({ key: String, data: Object });

// Crie os modelos
const Agn2Ins = mongoose.model('Agn2Ins', agn2InsSchema);
const Agn2Outs = mongoose.model('Agn2Outs', agn2OutsSchema);

// Inicialize o servidor Express
const app = express();
app.use(express.json());

app.post('/api/data', async (req, res) => {
  try {
    const inputData = req.body;
    const insertedData = await Agn2Ins.create({ data: inputData });
    const key = insertedData._id.toString();

    // Tente encontrar a chave na coleção agn2Outs repetidamente durante 10 segundos
    const startTime = Date.now();
    let foundData = null;

    while (Date.now() - startTime < 10000) {
      foundData = await Agn2Outs.findOne({ key });

      if (foundData) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (foundData) {
      res.status(200).json(foundData.data);
    } else {
      res.status(408).json({ error: 'Timeout error' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
