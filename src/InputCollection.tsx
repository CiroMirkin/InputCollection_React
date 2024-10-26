import React, { createContext, useContext, useEffect, useState } from "react"

/*
Other names that were considered in addition to InputCollection were: 
ExpandableInputList and InputStack.
*/

export interface InputData {
    id: string
    value: string
}

export type InputList = InputData[]

// Context

interface InputCollectionContextObj { 
    inputs: InputList, 
    setInputs: React.Dispatch<React.SetStateAction<InputData[]>>
}

const InputCollectionContextDefault: InputCollectionContextObj = { 
    inputs: [], 
    setInputs: () => {} 
}

const InputCollectionContext = createContext(InputCollectionContextDefault)

// Container component (InputCollection)

interface InputCollectionParams {
    inputs: InputList
    setInputs?: React.Dispatch<React.SetStateAction<InputData[]>>
    children: React.ReactNode
    className?: string
}

/** Expandable input list. */
function InputCollection({ children, inputs, setInputs, className }: InputCollectionParams) {
    // This state is used if we don´t receive an external state
    const [ ownInputs, setOwnInputs ] = useState(inputs)
    return (
        <div className={className}>
            <InputCollectionContext.Provider 
                value={{ 
                    setInputs: !setInputs ? setOwnInputs : setInputs, 
                    inputs: !setInputs ? ownInputs : inputs 
                }} 
            >
                { children }
            </InputCollectionContext.Provider>
        </div>
    )
}

export default InputCollection

/** Allows to add a new empty input at the end of the input list. */
function AddInputBtn({ children, className }: { children?: React.ReactNode, className?: string }) { 
    const buttonText = !!children ? children : 'add'
    const { inputs, setInputs } = useContext(InputCollectionContext)

    const addInput = () => {
        const newInput: InputData = {
            id: crypto.randomUUID(),
            value: ''
        }
        const newInputsData = [...inputs, {...newInput}]
        setInputs(newInputsData)
    }
    
    return (
        <button onClick={addInput} id="add-input-btn" className={className}>{ buttonText }</button>
    )
}

InputCollection.AddInputBtn = AddInputBtn

// Inputs

interface InputAttributes {
    type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'hidden' | 'url'
    placeholder?: string
    className?: string
}

interface InputListParams extends InputAttributes {
    deleteInputBtnClassName?: string
}

function InputList(props: InputListParams) {
    const [inputList, setInputList] = useState([] as React.ReactNode[])
    const { inputs } = useContext(InputCollectionContext)
    
    const InputAttributes: InputAttributes = { 
        type: props.type, 
        placeholder: props.placeholder,
        className: props.className
    }
    const deleteInputBtnClassName = props.deleteInputBtnClassName || ""

    /** Generate a list with inputs */
    const renderInputs = () => {
        setInputList(
            inputs.map(({ id }) =>
                <div key={id}>
                    <Input id={id} {...InputAttributes} />
                    <DeleteInputBtn inputId={id} className={deleteInputBtnClassName} />
                </div>
            )
        )
    }

    useEffect(renderInputs, [inputs.length])
    
    return (<>{ inputList }</>)
}

InputCollection.InputList = InputList

interface InputParams extends InputAttributes {
    id: string
}

function Input({ id, type = 'text', placeholder, className }: InputParams) {
    const { inputs, setInputs } = useContext(InputCollectionContext)

    const getInputValue = (): string => {
        const input = inputs.filter(inputData => inputData.id === id)[0]
        const doesInputExist = !!input
        return doesInputExist ? input.value : ''
    }

    const handleChange = (value: string) => {
        // Search for the right input and update its value.
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

interface DeleteInputBtnParams {
    inputId: string
    className: string
}

function DeleteInputBtn({ inputId, className }: DeleteInputBtnParams) {
    const { inputs, setInputs } = useContext(InputCollectionContext)

    const handleClick = () => {
        const newInputs = [...inputs].filter(input => input.id !== inputId)
        setInputs(newInputs)
    }

    return (
        <button onClick={handleClick} className={className}>Eliminar</button>
    )
}