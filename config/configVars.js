require("dotenv").config({ path: ".env" })

module.exports =  {
    PORT: process.env.PORT,
    DB: process.env.DB,
    MOTOS: process.env.MOTOS,
    CARROS: process.env.CARROS
}