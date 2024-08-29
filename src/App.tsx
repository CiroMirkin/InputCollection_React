import { useState } from 'react'
import './App.css'
import MoreInputs from './MoreInputs'

const testInputData = [
  {
    id: '1',
    content: 'pipi'
  },
  {
    id: '2',
    content: 'pupu'
  }
]

function App() {
  /** Lista con el contenido de los inputs */
  const [ inputs, setInputs ] = useState([...testInputData])
  return (
    <>
      <MoreInputs inputs={inputs} setInputs={setInputs}>
        <MoreInputs.Inputs></MoreInputs.Inputs>
        <MoreInputs.AddInputBtn></MoreInputs.AddInputBtn>
      </MoreInputs>
    </>
  )
}

export default App
