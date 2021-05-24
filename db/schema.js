const { gql } = require("apollo-server");

const Schema = gql`


    type Vehiculo {
        id: ID
        placa: String
        tipo: TipoVehiculo
    }

    type Estacionamiento {
        id: ID
        cedula: String
        nombre: String
        horaEntrada: String
        horaSalida: String
        montoPagado: Float
        vehiculo: Vehiculo
    }

    type HistorialVehiculo {
        vehiculo: Vehiculo
        historial: [Estacionamiento]
    }

    type PuestosDisponibles{
        carros: Int
        motos: Int
    }

    enum TipoVehiculo{
        CARRO
        MOTO
    }

    input InputVehiculo{
        placa: String
        tipo: TipoVehiculo
    }

    input InputEstacionamiento{
        cedula: String!
        nombre: String!
        horaSalida: String
        montoPagado: Float
        vehiculo: ID!
    }

    type Query {
        obtenerCantidadPuestos: PuestosDisponibles
        obtenerVehiculosEstacionados: [Estacionamiento] 
        obtenerHistorialVehiculo(id: ID): HistorialVehiculo
        obtenerVehiculoEstacionado(id: ID): Estacionamiento    
    }

    type Mutation {
        agregarVehiculo(input: InputVehiculo): Vehiculo
        entradaEstacionamiento(input: InputEstacionamiento): Estacionamiento
        salidaEstacionamiento(input: InputEstacionamiento): Estacionamiento
    }
`

module.exports = Schema