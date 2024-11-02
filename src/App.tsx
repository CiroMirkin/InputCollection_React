import { useState } from 'react'
import './App.css'
import InputCollection, { InputCollectionConfig } from './InputCollection'

const testInputData = [
  {
    id: '1',
    value: 'Jack Torrance'
  },
]

function App() {
  const [ inputs, setInputs ] = useState([...testInputData])

  const config: InputCollectionConfig = {
    textOfDeleteInputBtn: 'Delete',
    classOfDeleteInputBtn: 'btn',
    textOfAddInputBtn: 'Add',
    classOfAddInputBtn: 'btn',
    
    inputsPlaceholder: 'Write something...',
    inputsClassName: 'input',
    inputsType: "text",
  }

  return (
    <>
      <InputCollection inputs={inputs} setInputs={setInputs} className='container' config={config} />
    </>
  )
}

export default App
