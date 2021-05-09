module.exports = function({size, intentions}){
    var individuals = []
    var askedIndividuals = 0

    for(var intention of intentions){
        var individualsWIthIntention = size*(intention.percentage/100)
        for(var i=0; i<individualsWIthIntention; i++){
            individuals.push(intention.intention)
        }
    }

    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     */
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    individuals = shuffle(individuals)


    return Object.freeze({
        getSize,
        askIntentionTo,
        getAskedIndividuals
    })

    async function getSize(){
        return size
    }

    async function askIntentionTo(i){
        askedIndividuals++
        return individuals[i]
    }

    async function getAskedIndividuals(){
        return askedIndividuals
    }
}