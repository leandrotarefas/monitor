const moment = require("moment");

const ExtratorRepository = require("../repositories/ExtratorRepository");

const save = async (nome) => {
    return await ExtratorRepository.save(nome);
}


const list = async () => {
    const dataAtual = moment().startOf('day').toDate();

    const countAtrasados = await ExtratorRepository.countExtratoresAtrasados(dataAtual);
    const extratoresAtrasados = await ExtratorRepository.findExtratoresAtrasados(dataAtual);
    const extratoresPreenchidos = await ExtratorRepository.findExtratoresPreenchidos(dataAtual);

    const total = countAtrasados + extratoresPreenchidos.length;
    const percentualAtrasados = total === 0 ? 0 : (countAtrasados / total) * 100;
    const percentualPreenchidos = total === 0 ? 0 : (extratoresPreenchidos.length / total) * 100;

    return {
        total: total,
        atrasados: {
            quantidade: countAtrasados,
            percentual: percentualAtrasados,
            extratores: extratoresAtrasados,
        },
        preenchidos: {
            quantidade: extratoresPreenchidos.length,
            percentual: percentualPreenchidos,
            extratores: extratoresPreenchidos,
        },
    };
}


module.exports = { save, list }