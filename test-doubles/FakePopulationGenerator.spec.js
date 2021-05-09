const { expect } = require("chai")
const Generator = require('./FakePopulationGenerator')

describe('PopulationGenerator', function(){
    let generator

    beforeEach(function(){
        generator = Generator()

        this.givenPopulation = async function ({size, Apercentage, Bpercentage}){
            return await generator.generate({
                size,
                intentions: [
                    {intention: 'A', percentage: Apercentage},
                    {intention: 'B', percentage: Bpercentage}
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
        var population = await this.givenPopulation({size:10, Apercentage:50, Bpercentage:50})
        await this.assertPopulation({population, expectedSize:10, Aindividuals: 5, Bindividuals: 5})
    })

    it('must create a population with 80% of the members voting one option and 20% other option', async function(){
        var population = await this.givenPopulation({size:100, Apercentage:80, Bpercentage:20})
        await this.assertPopulation({population, expectedSize:100, Aindividuals: 80, Bindividuals: 20})
    })

    it('must shuffle the elements', async function(){
        var intentions = []
        for(var i =0; i<100; i++){
            var population = await this.givenPopulation({size: 100, Apercentage: 50, Bpercentage:50})
            intentions.push(await population.askIntentionTo(0))
        }
        
        var intentionA = 0
        var intentionB = 0
        for(var intention of intentions){
            if(intention === 'A') intentionA++
            if(intention === 'B') intentionB++
        }

        expect(Math.abs(intentionA-intentionB)).to.be.lessThan(50)
    })

    it('must return the people that was asked', async function(){
        for(var askedIndividuals = 1; askedIndividuals<5; askedIndividuals++){
            console.log(askedIndividuals)
            var population = await this.givenPopulation({size: 100, Apercentage: 50, Bpercentage:50})
            for(var i =0; i<askedIndividuals; i++) await population.askIntentionTo(i)
            expect(await population.getAskedIndividuals()).to.equal(askedIndividuals)
        }
    })
})