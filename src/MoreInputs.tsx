import React, { ComponentType, createContext, useContext, useEffect, useState } from "react"

export interface InputData {
    id: string
    value: string
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
}

function MoreInputs({ children, inputs, setInputs }: MoreInputsParams) {
    return (
        <>
            <MoreInputsContext.Provider value={{ setInputs, inputs }} >
                { children }
            </MoreInputsContext.Provider>
        </>
    )
}

export default MoreInputs

function AddInputBtn({ children }: { children?: React.ReactNode }) { 
    const btn = !!children ? children : <button>add</button>
    const { inputs, setInputs } = useContext(MoreInputsContext)

    const addInput = () => {
        const newInput: InputData = {
            id: crypto.randomUUID(),
            value: ''
        }
        const newInputsData = [...inputs, {...newInput}]
        setInputs(newInputsData)
    }
    
    return (
        <span onClick={addInput}>{ btn }</span>
    )
}

MoreInputs.AddInputBtn = AddInputBtn

interface InputAttributes {
    type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'hidden' | 'url'
    placeholder?: string
    className?: string
}

function Inputs(props: InputAttributes) {
    const [inputList, setInputList] = useState([] as React.ReactNode[])
    const { inputs } = useContext(MoreInputsContext)
    console.table(props)
    /** Genera una lista con inputs */
    const renderInputs = () => {
        setInputList(
            inputs.map(({ id }) =>
                <Input key={id} id={id} {...props} />
            )
        )
    }

    useEffect(renderInputs, [inputs.length])
    
    return (<>{ inputList }</>)
}

MoreInputs.Inputs = Inputs

function CustomInput<P>(Input: ComponentType<P>) {
    return (props: any) => <Input {...props} />
}

MoreInputs.CustomInput = CustomInput

interface InputParams extends InputAttributes {
    id: string
}

function Input({ id, type = 'text', placeholder, className }: InputParams) {
    const { inputs, setInputs } = useContext(MoreInputsContext)

    const getInputValue = (): string => {
        return inputs.filter(inputData => inputData.id === id)[0].value
    }

    /** @param value Es el contenido del input */
    const handleChange = (value: string) => {
        const newInputs = inputs.map(inputData => {
            return inputData.id === id ? {...inputData, value} : {...inputData}
        })

        setInputs(newInputs)
    }

    return(
        <input 
            id={id} 
            type={type}
            placeholder={placeholder}
            className={className}
            value={getInputValue()} 
            onChange={e => handleChange(e.target.value)}
        />
    )
}