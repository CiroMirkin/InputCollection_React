import './App.css'
import MoreInputs, { InputData } from './MoreInputs'

function App() {
  const inputsData: InputData[] = [
    {
      id: '1'
    },
    {
      id: '2'
    }
  ]
  
  return (
    <>
      <MoreInputs inputsData={inputsData}>
        <MoreInputs.AddInputBtn></MoreInputs.AddInputBtn>
      </MoreInputs>
    </>
  )
}

export default App
