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

// Config object

export interface InputCollectionConfig {
    textOfDeleteInputBtn?: string
    textOfAddInputBtn?: string
    classOfDeleteInputBtn?: string
    classOfAddInputBtn?: string
    inputsClassName?: string
    inputsPlaceholder?: string
    inputsType?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'hidden' | 'url'

}

const defaultConfig: InputCollectionConfig = Object.freeze({
    textOfDeleteInputBtn: 'Delete',
    textOfAddInputBtn: 'Add',
    inputsType: 'text',
    inputsPlaceholder: '',
    inputsClassName: '',
})

// Context

interface InputCollectionContextObj { 
    inputs: InputList, 
    setInputs: React.Dispatch<React.SetStateAction<InputData[]>>
    config: InputCollectionConfig
}

const InputCollectionContextDefault: InputCollectionContextObj = { 
    inputs: [], 
    setInputs: () => {},
    config: defaultConfig,
}

const InputCollectionContext = createContext(InputCollectionContextDefault)

// Container component (InputCollection)

interface InputCollectionParams {
    inputs: InputList
    setInputs?: React.Dispatch<React.SetStateAction<InputData[]>>
    children: React.ReactNode
    className?: string
    config?: InputCollectionConfig
}

/** Expandable input list. */
function InputCollection({ children, inputs, setInputs, className, config }: InputCollectionParams) {
    // This state is used if we don´t receive an external state
    const [ ownInputs, setOwnInputs ] = useState(inputs)
    return (
        <div className={className}>
            <InputCollectionContext.Provider 
                value={{ 
                    setInputs: !setInputs ? setOwnInputs : setInputs, 
                    inputs: !setInputs ? ownInputs : inputs,
                    config: (config ? config : defaultConfig),
                }} 
            >
                { children }
            </InputCollectionContext.Provider>
        </div>
    )
}

export default InputCollection

/** Allows to add a new empty input at the end of the input list. */
function AddInputBtn({ }: { }) { 
    const { inputs, setInputs, config } = useContext(InputCollectionContext)
    const buttonText = config.textOfAddInputBtn
    const className = config.classOfAddInputBtn

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

function InputList() {
    const [inputList, setInputList] = useState([] as React.ReactNode[])
    const { inputs } = useContext(InputCollectionContext)

    /** Generate a list with inputs */
    const renderInputs = () => {
        setInputList(
            inputs.map(({ id }) =>
                <div key={id}>
                    <Input id={id} />
                    <DeleteInputBtn inputId={id} />
                </div>
            )
        )
    }

    useEffect(renderInputs, [inputs.length])
    
    return (<>{ inputList }</>)
}

InputCollection.InputList = InputList

interface InputParams {
    id: string
}

function Input({ id }: InputParams) {
    const { inputs, setInputs, config } = useContext(InputCollectionContext)
    const type = config.inputsType
    const placeholder = config.inputsPlaceholder
    const className = config.inputsClassName

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
}

function DeleteInputBtn({ inputId }: DeleteInputBtnParams) {
    const { inputs, setInputs, config } = useContext(InputCollectionContext)
    const { classOfDeleteInputBtn, textOfDeleteInputBtn } = config

    const handleClick = () => {
        const newInputs = [...inputs].filter(input => input.id !== inputId)
        setInputs(newInputs)
    }

    return (
        <button onClick={handleClick} id="delete-input-btn" className={classOfDeleteInputBtn}>{ textOfDeleteInputBtn }</button>
    )
}