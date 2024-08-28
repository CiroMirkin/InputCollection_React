import React, { ComponentType, createContext, useContext, useEffect, useState } from "react"

export interface InputData {
    id: string
    content: string
}

interface MoreInputsContextObj { 
    addInput: () => void, 
    inputs: InputData[], 
    setInputs: React.Dispatch<React.SetStateAction<InputData[]>>
}

const MoreInputsContextDefault: MoreInputsContextObj = { 
    addInput: () => {}, 
    inputs: [], 
    setInputs: () => {} 
}

const MoreInputsContext = createContext(MoreInputsContextDefault)

interface MoreInputsParams {
    inputs: InputData[]
    setInputs: React.Dispatch<React.SetStateAction<InputData[]>>
    children: React.ReactNode
    type?: 'text' | 'password' | 'number'
}

function MoreInputs({ children, inputs, setInputs }: MoreInputsParams) {
    /** Lista de componentes Input */
    const [inputList, setInputList] = useState([] as React.ReactNode[])

    /** Genera una lista con inputs */
    const renderInputs = () => {
        setInputList(
            inputs.map(({ id }) =>
                <div key={id}>
                    <Input id={id} />
                </div>
            )
        )
    }
    useEffect(renderInputs, [inputs.length])
    
    const addInput = () => {
        const newInput: InputData = {
            id: crypto.randomUUID(),
            content: ''
        }
        const newInputsData = [...inputs, {...newInput}]
        setInputs(newInputsData)
    }

    return (
        <>
            <MoreInputsContext.Provider value={{ addInput, setInputs, inputs }} >
                { inputList }
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

function CustomInput<P>(Input: ComponentType<P>) {
    return (props: any) => <Input {...props} />
}

MoreInputs.CustomInput = CustomInput


interface InputParams {
    id: string
}

function Input({ id }: InputParams) {
    const { inputs, setInputs } = useContext(MoreInputsContext)

    const getInputValue = (): string => {
        return inputs.filter(inputData => inputData.id === id)[0].content
    }

    const handleChange = (inputValue: string) => {
        const newIns = inputs.map(inputData => {
            if(inputData.id === id) {
                return {
                    ...inputData,
                    content: inputValue
                }
            }
            return {...inputData}
        })

        console.table(newIns)
        setInputs(newIns)
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