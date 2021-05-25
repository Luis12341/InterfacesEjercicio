const contarPuestos = (array) => {
    const carros = array.filter(
        (carro) => carro.horaSalida === undefined && carro.vehiculo.tipo === "CARRO" 
    );
    const motos = array.filter(
        (moto) => moto.horaSalida === undefined && moto.vehiculo.tipo === "MOTO"
    );
    console.log(carros, motos)
    return {
        carros: carros.length,
        motos: motos.length,
    };
};

module.exports = {
    contarPuestos,
};
