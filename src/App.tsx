import { useState } from 'react'
import './App.css'
import InputCollection from './MoreInputs'

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
  return (
    <>
      <InputCollection inputs={inputs} setInputs={setInputs}>
        <InputCollection.InputList />
        <InputCollection.AddInputBtn></InputCollection.AddInputBtn>
      </InputCollection>
    </>
  )
}

export default App
