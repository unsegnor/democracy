const FakePopulation = require("./FakePopulation")

module.exports = function(){
    return Object.freeze({
        generate
    })

    async function generate({size, intentions}){
        return FakePopulation({size, intentions})
    }
}