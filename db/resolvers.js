const Vehiculo = require("../models/Vehiculo");
const Estacionamiento = require("../models/Estacionamiento");
const { contarPuestos } = require("../utils");
const { MOTOS, CARROS } = require("../config/configVars");

const resolvers = {
    Query: {
        obtenerCantidadPuestos: async () => {
            try {
                const puestosOcupados = await Estacionamiento.find({
                    horaSalida: null,
                }).populate("vehiculo");
                const puestosO = contarPuestos(puestosOcupados);

                return puestosO;
            } catch (error) {
                console.log(error.message);
            }
        },
        obtenerVehiculosEstacionados: async () => {
            try {
                const puestosOcupados = await Estacionamiento.find({
                    horaSalida: null,
                }).populate("vehiculo");
                return puestosOcupados;
            } catch (error) {
                console.log(error.message);
            }
        },
        obtenerHistorialVehiculo: async (_,{id}) => {
            const vehiculo = await Vehiculo.findById(id)
            
            if (!vehiculo) {
                throw new Error('El Vehiculo no esta registrado')
            }

            const historial = await Estacionamiento.find({vehiculo: id})

            return {vehiculo, historial}
        },
        obtenerVehiculoEstacionado: async () => {},
    },
    Mutation: {
        agregarVehiculo: async (_, { input }) => {
            const existeVehiculo = await Vehiculo.findOne({
                placa: input.placa,
            });

            if (existeVehiculo) {
                throw new Error("Vehiculo ya registrado");
            }

            const nuevoVehiculo = new Vehiculo(input);
            await nuevoVehiculo.save();
            return nuevoVehiculo;
        },
        entradaEstacionamiento: async (_, { input }) => {
            const puestosOcupados = await Estacionamiento.find({
                horaSalida: null,
            }).populate("vehiculo");

            const puestosO = contarPuestos(puestosOcupados);

            const vehiculo = await Vehiculo.findOne({
                _id: input.vehiculo,
            });

            if (vehiculo.tipo === "CARRO") {
                if (puestosO.carros >= CARROS) {
                    throw new Error(
                        "No hay puestos disponibles para Carros, no se puede ingresar el vehiculo"
                    );
                }

                return await nuevaEntrada(input);
            } else {
                if (puestosO.motos >= MOTOS) {
                    throw new Error(
                        "No hay puestos disponibles para Motos, no se puede ingresar el vehiculo"
                    );
                }
                return await nuevaEntrada(input);
            }
        },
        salidaEstacionamiento: async (_, { id }) => {
            const puesto = await Estacionamiento.findById(id).populate(
                "vehiculo"
            );
            if (!puesto.horaSalida) {
                throw new Error('El Vehiculo ya ha salido')
            }

            const fechaE = new Date(puesto.horaEntrada);
            const fechaS = new Date();
            const diff = fechaS.getTime() - fechaE.getTime();
            const horas = Math.ceil(diff / (1000 * 60 * 60));

            const costoEstacionamiento = calcularCosto(puesto, horas);

            puesto.montoPagado = costoEstacionamiento;
            puesto.horaSalida = fechaE;

            await puesto.save();

            return puesto;
        },
    },
};

const nuevaEntrada = async (input) => {
    const nueva = new Estacionamiento(input);
    await nueva.save();
    return await Estacionamiento.findById(nueva._id).populate("vehiculo");
};
const calcularCosto = (puesto, horas) => {
    let precio = 0;
    if (puesto.vehiculo.tipo === "CARRO") {
        precio = 0.5 + (horas - 1) * 0.4;
    } else {
        precio = 0.5 + (horas - 1) * 0.3;
    }

    return precio;
};

module.exports = resolvers;
