const contarPuestos = (array) => {
    const carros = array.map(
        (carro) => carro.horaSalida === undefined && carro.vehiculo.tipo === "CARRO" && carro
    );
    const motos = array.map(
        (carro) => carro.horaSalida === undefined && carro.vehiculo.tipo === "MOTO" && carro
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
