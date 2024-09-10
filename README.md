# Input Collection React Component

![Input Collection View](https://i.postimg.cc/05MSnzwV/Input-Collection.jpg)

```jsx
import { useState } from 'react'
import './App.css'
import InputCollection, { InputList } from './InputCollection'

function App() {
    const [ inputs, setInputs ] = useState([] as InputList)
    return (
        <>
            <InputCollection inputs={inputs} setInputs={setInputs} className='container'>
                <InputCollection.InputList className='input' deleteInputBtnClassName='btn'/>
                <InputCollection.AddInputBtn className='btn'></InputCollection.AddInputBtn>
            </InputCollection>
        </>
    )
}
```

## Running The Project Locally

### Clone The Project

```
git clone git@github.com:CiroMirkin/InputCollection_React.git
```

### Install Dependencies

```
npm i
```

### Start The Development Server

```
npm run dev
```