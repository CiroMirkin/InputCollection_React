import React, { createContext, useContext, useEffect, useState } from "react"

export interface InputData {
    id: string
    content: string
}

const MoreInputsContext = createContext({ addInput: () => {}, ins: [], setIns: () => {} } as { addInput: () => void, ins: InputData[], setIns: any })


const inputsData: InputData[] = [
    {
      id: '1',
      content: 'pipi'
    },
    {
      id: '2',
      content: 'pupu'
    }
  ]

interface MoreInputsParams {
    children: React.ReactNode
    type?: 'text' | 'password' | 'number'
}

function MoreInputs({ children }: MoreInputsParams) {
    const [ ins, setIns ] = useState([...inputsData])
    const [inputs, setInputs] = useState([] as React.ReactNode[])

    /** Genera una lista con inputs */
    const renderInputs = () => {
        setInputs(
            ins.map(({ id }) =>
                <div key={id}>
                    <Input id={id} />
                </div>
            )
        )
    }
    useEffect(renderInputs, [ins.length])
    
    const addInput = () => {
        const newInput: InputData = {
            id: crypto.randomUUID(),
            content: ''
        }
        const newInputsData = [...ins, {...newInput}]
        setIns(newInputsData)
    }

    return (
        <>
            <MoreInputsContext.Provider value={{ addInput, setIns, ins }} >
                { inputs }
                { children }
            </MoreInputsContext.Provider>
        </>
    )
}

export default MoreInputs

function AddInputBtn({ children }: { children?: React.ReactNode }) { 
    const btn = !!children ? children : <button>add</button>
    const addInput = useContext(MoreInputsContext).addInput
    return (
        <span onClick={addInput}>{ btn }</span>
    )
}

MoreInputs.AddInputBtn = AddInputBtn


interface InputParams {
    id: string
}

function Input({ id }: InputParams) {
    const { ins, setIns } = useContext(MoreInputsContext)

    const getInputValue = (): string => {
        return ins.filter(inputData => inputData.id === id)[0].content
    }

    const handleChange = (inputValue: string) => {
        const newIns = ins.map(inputData => {
            if(inputData.id === id) {
                return {
                    ...inputData,
                    content: inputValue
                }
            }
            return {...inputData}
        })

        console.table(newIns)
        setIns(newIns)
    }

    return(
        <input 
            id={id} 
            type="text" 
            value={getInputValue()} 
            onChange={e => handleChange(e.target.value)}
        />
    )
}