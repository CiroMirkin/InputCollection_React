import InputCollection, { InputCollectionConfig } from './InputCollection'

describe('Add inputs.', () => {
    it('Add an input when the collection is empty.', () => {
        cy.mount(
            <InputCollection inputs={[]} >
                <InputCollection.InputList />
                <InputCollection.AddInputBtn />
            </InputCollection>
        )
        cy.get("[type-btn=add-input-btn]").click()
        cy.get("[id=input-list]").children().should('have.lengthOf', 1)
    })
    it('Add a new input when an input already exist.', () => {
        const inputs = [
            {
                id: '1',
                value: 'pipi'
            }
        ]
        cy.mount(
            <InputCollection inputs={inputs} >
                <InputCollection.InputList />
                <InputCollection.AddInputBtn />
            </InputCollection>
        )
        cy.get("[type-btn=add-input-btn]").click()
        cy.get("[id=input-list]").children().should('have.lengthOf', 2)
    })
})
describe('Delete the input.', () => {
    it('', () => {
        const inputs = [
            {
                id: '1',
                value: 'pedro'
            }
        ]
        cy.mount(
            <InputCollection inputs={inputs} >
                <InputCollection.InputList />
                <InputCollection.AddInputBtn />
            </InputCollection>
        )
        cy.get("[type-btn=delete-input-btn]").click()
        cy.get("[id=input-list]").should('be.empty')
    })
})

describe('Use config object.', () => {
    it('Text attributes work.', () => {
        const inputs = [
            {
                id: '1',
                value: ''
            }
        ]
        const config: InputCollectionConfig = {
            textOfDeleteInputBtn: 'Eliminar',
            textOfAddInputBtn: 'Agregar nombre',
            inputsPlaceholder: 'Escribe el nombre...',
        }

        cy.mount(
            <InputCollection inputs={inputs} config={config} >
                <InputCollection.InputList />
                <InputCollection.AddInputBtn />
            </InputCollection>
        )
        cy.get("[id=input-list]").children().first().children().last().contains('Eliminar')
        cy.get("[type-btn=add-input-btn]").contains('Agregar nombre')
    })

    it('The user config and the default config are merged.', () => {
        const inputs = [
            {
                id: '1',
                value: ''
            }
        ]
        const config: InputCollectionConfig = {
            textOfDeleteInputBtn: 'Eliminar',
        }

        cy.mount(
            <InputCollection inputs={inputs} config={config} >
                <InputCollection.InputList />
                <InputCollection.AddInputBtn />
            </InputCollection>
        )
        cy.get("[id=input-list]").children().first().children().last().contains('Eliminar')
        cy.get("[type-btn=add-input-btn]").contains('Add')
    })
})