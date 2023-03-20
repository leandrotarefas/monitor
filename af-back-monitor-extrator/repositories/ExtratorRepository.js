const ExtratorModel = require("../models/ExtratorModel");

const save = async (nome) => {

  const dataAtual = new Date();

  const extratorExistente = await ExtratorModel.findOne({ nome });

  if (extratorExistente) {

    return await ExtratorModel.findOneAndUpdate(
      { nome },
      { dataRecebimento: dataAtual },
      { new: true });

  } else {

    const extrator = new ExtratorModel({
      nome,
      dataRecebimento: dataAtual,
    });

    return await extrator.save();
  }
}

const countExtratoresAtrasados = async (dataAtual) => {
  return ExtratorModel.countDocuments({ dataRecebimento: { $lt: dataAtual } });
}

const findExtratoresAtrasados = (dataAtual) => {
  return ExtratorModel.find({ dataRecebimento: { $lt: dataAtual } }, { nome: 1, _id: 0, dataRecebimento: 1 });
}

const findExtratoresPreenchidos = (dataAtual) => {
  return ExtratorModel.find({ dataRecebimento: { $gte: dataAtual } }, { nome: 1, _id: 0, dataRecebimento: 1 });
}

module.exports = { save, countExtratoresAtrasados, findExtratoresAtrasados, findExtratoresPreenchidos }