const Vehiculo = require("../models/Vehiculo");
const Estacionamiento = require("../models/Estacionamiento");
const { contarPuestos } = require("../utils");
const { MOTOS, CARROS } = require("../config/configVars");

const resolvers = {
    Query: {
        obtenerCantidadPuestos: async () => {},
        obtenerVehiculosEstacionados: async () => {},
        obtenerHistorialVehiculo: async () => {},
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
            }).populate("Vehiculo");


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
                let salida = await nuevaEntrada(input);
                // console.log(salida)
                return salida;
            } else {
                if (puestosO.motos >= MOTOS) {
                    throw new Error(
                        "No hay puestos disponibles para Motos, no se puede ingresar el vehiculo"
                    );
                }
                let salida = (await nuevaEntrada(input)).populate("Vehiculo");
                // console.log(salida)
                return salida;
            }
        },
        salidaEstacionamiento: async (_, { input }) => {},
    },
};

const nuevaEntrada = async (input) => {
    const nueva = new Estacionamiento(input);
    await nueva.save();
    return await Estacionamiento.findById(nueva._id).populate('Vehiculo')
};

module.exports = resolvers;
