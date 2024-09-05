import { useState } from 'react'
import './App.css'
import InputCollection from './InputCollection'

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
      <InputCollection inputs={inputs} setInputs={setInputs} className='container'>
        <InputCollection.InputList 
          className='input'
          deleteInputBtnClassName='btn'
        />
        <InputCollection.AddInputBtn
          className='btn'
        ></InputCollection.AddInputBtn>
      </InputCollection>
    </>
  )
}

export default App
