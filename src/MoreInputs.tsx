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
            ins.map(({ id, content }) =>
                <div key={id}>
                    <input id={id} type="password" value={content} />
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
            { inputs }
            <MoreInputsContext.Provider value={{ addInput, setIns, ins }} >
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