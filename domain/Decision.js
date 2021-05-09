const { maxConcurrentTestRunners } = require("../stryker.conf")

module.exports = function({population}){
    return Object.freeze({
        make
    })

    async function make(){
        var sample = await getSampleSize()
    }

    async function getSampleSize(){
        
    }

    async function askEveryone(){

        var size = await population.getSize()
        var results = {}
        for(var i=0; i<size; i++){
            var vote = await population.askIntentionTo(i)
            if(results[vote]) results[vote]++
            else results[vote] = 1
        }

        var options = Object.getOwnPropertyNames(results)

        if(results[options[0]] > results[options[1]]) conclusion = options[0]
        else conclusion = options[1]

        return {
            conclusion
        }
    }
}