import { useEffect, useState } from "react"

export interface InputData {
    id: string
    type?: 'text' | 'password' | 'number'
}

function MoreInputs({ inputsData }: { inputsData: InputData[] }) {
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

    return (
        <>{ inputs }</>
    )
}

export default MoreInputs