import InputCollection, { InputCollectionConfig } from './InputCollection'

describe('Add an input when the collection is empty.', () => {
    it('mounts', () => {
        cy.mount(
            <InputCollection inputs={[]} >
                <InputCollection.InputList />
                <InputCollection.AddInputBtn />
            </InputCollection>
        )
        cy.get("[id=add-input-btn]").click()
  })
})

describe('Add a new input when an input already exist.', () => {
    it('mounts', () => {
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
        cy.get("[id=add-input-btn]").click()
  })
})

describe('Use config object.', () => {
    it('mounts', () => {
        const inputs = [
            {
                id: '1',
                value: 'pipi'
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
        cy.get("[id=add-input-btn]").click()
  })
})