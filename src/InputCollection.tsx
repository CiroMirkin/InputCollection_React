import React, { createContext, useContext, useEffect, useState } from "react"

/*
Otros nombres que se consideraron fueron aparte de InputCollection (Colección De Inputs) fueron: 
ExpandableInputList (Lista De Inputs Expandible) y InputStack (Pila De Inputs)
*/

export interface InputData {
    id: string
    value: string
}

export type InputList = InputData[]

// Contexto

interface InputCollectionContextObj { 
    inputs: InputList, 
    setInputs: React.Dispatch<React.SetStateAction<InputData[]>>
}

const InputCollectionContextDefault: InputCollectionContextObj = { 
    inputs: [], 
    setInputs: () => {} 
}

const InputCollectionContext = createContext(InputCollectionContextDefault)

// Componente principal (InputCollection)

interface InputCollectionParams {
    inputs: InputList
    setInputs: React.Dispatch<React.SetStateAction<InputData[]>>
    children: React.ReactNode
}

/** Lista de inputs agrandable. */
function InputCollection({ children, inputs, setInputs }: InputCollectionParams) {
    return (
        <>
            <InputCollectionContext.Provider value={{ setInputs, inputs }} >
                { children }
            </InputCollectionContext.Provider>
        </>
    )
}

export default InputCollection

/** Permite agregar un nuevo input vacio al final de la lista de inputs. */
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
        <button onClick={addInput} className={className}>{ buttonText }</button>
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

    /** Genera una lista con inputs */
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