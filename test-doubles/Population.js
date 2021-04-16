module.exports = function({size, intentions}){
    var individuals = []

    for(var intention of intentions){
        var individualsWIthIntention = size*(intention.percentage/100)
        for(var i=0; i<individualsWIthIntention; i++){
            individuals.push(intention.intention)
        }
    }

    return Object.freeze({
        getSize,
        askIntentionTo
    })

    async function getSize(){
        return size
    }

    async function askIntentionTo(i){
        return individuals[i]
    }
}