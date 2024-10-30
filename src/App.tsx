import { useState } from 'react'
import './App.css'
import InputCollection, { InputCollectionConfig } from './InputCollection'

const testInputData = [
  {
    id: '1',
    value: 'pipi'
  },
  {
    id: '2',
    value: 'pupu'
  }
]

function App() {
  /** Lista con el contenido de los inputs */
  const [ inputs, setInputs ] = useState([...testInputData])

  const config: InputCollectionConfig = {
    classOfDeleteInputBtn: 'btn',
    classOfAddInputBtn: 'btn',
    inputsClassName: 'input',
    inputsType: "text",
    textOfAddInputBtn: 'Add',
    textOfDeleteInputBtn: 'Delete',
  }

  return (
    <>
      <InputCollection inputs={inputs} setInputs={setInputs} className='container' config={config} />
    </>
  )
}

export default App
