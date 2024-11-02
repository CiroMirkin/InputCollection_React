# Input Collection React Component

![Input Collection View](https://i.postimg.cc/05MSnzwV/Input-Collection.jpg)

```jsx
import { useState } from 'react'
import './App.css'
import InputCollection, { InputList, InputCollectionConfig } from './InputCollection'

function App() {
    const [ names, setNames ] = useState([] as InputList)

    const config: InputCollectionConfig = {
        textOfDeleteInputBtn: 'Delete',
        classOfDeleteInputBtn: 'btn',
        textOfAddInputBtn: 'Add',
        classOfAddInputBtn: 'btn',
        
        inputsPlaceholder: 'Write the name...',
        inputsClassName: 'input',
        inputsType: "text",
    }

    return (
        <InputCollection 
            inputs={names} 
            setInputs={setNames} 
            className='container' 
            config={config} 
        />
    )
}
```

Component with a custom button:

```jsx
import { useState } from 'react'
import InputCollection, { InputList, InputCollectionConfig } from './InputCollection'

function App() {
    const [ names, setNames ] = useState([] as InputList)

    const config: InputCollectionConfig = {
        customBtnComponent: <button className={className}>Add</button>
    }

    return (
        <InputCollection 
            inputs={names} 
            setInputs={setNames} 
            config={config} 
        />
    )
}
```

Component without optional attributes:

```jsx
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
        <InputCollection inputs={inputs} setInputs={setInputs} />
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

# Component Testing

Run [Cypress](https://docs.cypress.io/app/component-testing/react/overview) with:

```
npx cypress open
```

Click on `Component Testing` and choose a browser.
