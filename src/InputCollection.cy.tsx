import InputCollection from './InputCollection'

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