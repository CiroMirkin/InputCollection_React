# Input Collection React Component

![Input Collection View](https://i.postimg.cc/05MSnzwV/Input-Collection.jpg)

```jsx
import { useState } from 'react'
import './App.css'
import InputCollection, { InputList } from './InputCollection'

function App() {
    const [ names, setNames ] = useState([] as InputList)

    return (
        <InputCollection inputs={names} setInputs={setNames} className='container'>
            <InputCollection.InputList className='input' deleteInputBtnClassName='btn'/>
            <InputCollection.AddInputBtn className='btn'></InputCollection.AddInputBtn>
        </InputCollection>
    )
}
```

Component without optional attributes:

```tsx
function App() {
    const [ inputs, setInputs ] = useState([
    {
        id: '1',
        value: 'Lorem 1'
    },
    {
        id: '2',
        value: 'Lorem 2'
    }
    ] as InputList)

    return (
        <InputCollection inputs={inputs} setInputs={setInputs}>
            <InputCollection.InputList />
            <InputCollection.AddInputBtn />
        </InputCollection>
    )
}
```

You can copy and paste the [InputCollection.tsx](./src/InputCollection.tsx) file into your project. 

## Running The Project Locally

Clone The Project:

```
git clone git@github.com:CiroMirkin/InputCollection_React.git
```

Install Dependencies:

```
npm i
```

Start The Development Server:

```
npm run dev
```