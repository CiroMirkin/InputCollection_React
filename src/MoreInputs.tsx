import React, { createContext, useContext, useState } from "react"


const MoreInputsContext = createContext({ addInput: () => {} } as { addInput: () => void })

export interface InputData {
    id: string
    content: string
}

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
    const [inputs, setInputs] = useState([] as React.ReactNode[])

    /** Genera una lista con inputs */
    const renderInputs = () => {
        setInputs(
            inputsData.map(({ id, content }) =>
                <div key={id}>
                    <input id={id} type="password" value={content} />
                </div>
            )
        )
    }

    const addInput = () => {
        const newInput: InputData = {
            id: crypto.randomUUID(),
            content: ''
        }
        inputsData.push({...newInput})
        renderInputs()
        console.table(inputsData)
    }

    return (
        <>
            { inputs }
            <MoreInputsContext.Provider value={{ addInput }} >
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