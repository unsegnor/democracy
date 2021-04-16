const { expect } = require("chai")
const Generator = require('./PopulationGenerator')

describe('PopulationGenerator', function(){
    let generator

    beforeEach(function(){
        generator = Generator()

        this.givenPopulation = async function ({size, Apercentage, Bpercentage}){
            return await generator.generate({
                size: '10',
                intentions: [
                    {intention: 'A', percentage: '50'},
                    {intention: 'B', percentage: '50'}
                ]
            })
        }

        this.assertPopulation = async function ({population, expectedSize, Aindividuals, Bindividuals}){
            var intentionA = 0
            var intentionB = 0
            var size = await population.getSize()
            for(var i=0; i<size; i++){
                var intention = await population.askIntentionTo(i)
                if(intention === 'A') intentionA++
                if(intention === 'B') intentionB++
            }
    
            expect(size).to.equal(expectedSize)
            expect(intentionA).to.equal(Aindividuals)
            expect(intentionB).to.equal(Bindividuals)
        }
    })

    it('must create a population with 50% of the members voting one option and 50% other option', async function(){
        var population = this.givenPopulation({size:10, Apercentage:50, Bpercentage:50})
        this.assertPopulation({population, expectedSize:10, Aindividuals: 5, Bindividuals: 5})
    })

    it('must create a population with 80% of the members voting one option and 20% other option', async function(){
        var population = this.givenPopulation({size:100, Apercentage:80, Bpercentage:20})
        this.assertPopulation({population, expectedSize:100, Aindividuals: 80, Bindividuals: 20})
    })
})