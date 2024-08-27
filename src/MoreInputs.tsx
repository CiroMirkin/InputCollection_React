import React, { createContext, useContext, useEffect, useState } from "react"


const MoreInputsContext = createContext({ addInput: () => {} } as { addInput: () => void })

export interface InputData {
    id: string
    type?: 'text' | 'password' | 'number'
}

interface MoreInputsParams {
    inputsData: InputData[]
    children: React.ReactNode
}

function MoreInputs({ inputsData, children }: MoreInputsParams) {
    const [inputs, setInputs] = useState([] as React.ReactNode[])

    /** Genera una lista con inputs */
    const renderInputs = () => {
        setInputs(
            inputsData.map(({ id }) =>
                <div key={id}>
                    <input id={id} type="password"  />
                </div>
            )
        )
    }

    useEffect(renderInputs, [inputsData.length])

    const addInput = () => {console.log('oioi')}

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