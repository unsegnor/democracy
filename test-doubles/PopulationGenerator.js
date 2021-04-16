const Population = require("./Population")

module.exports = function(){
    return Object.freeze({
        generate
    })

    async function generate({size, intentions}){
        return Population({size, intentions})
    }
}