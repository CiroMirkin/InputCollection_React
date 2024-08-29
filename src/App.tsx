import { useState } from 'react'
import './App.css'
import MoreInputs from './MoreInputs'

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
      <MoreInputs inputs={inputs} setInputs={setInputs}>
        <MoreInputs.InputList></MoreInputs.InputList>
        <MoreInputs.AddInputBtn></MoreInputs.AddInputBtn>
      </MoreInputs>
    </>
  )
}

export default App
