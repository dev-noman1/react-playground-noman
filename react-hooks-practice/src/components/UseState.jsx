import React from 'react'
import { useState } from 'react'

const UseState = () => {

    const [count, setCount] = useState(0)
    return (
        <div className='UseStatePage'>
            <h1>useState</h1>
            <main>
                <button onClick={() => setCount(count + 1)}>increament</button>
                <button onClick={() => setCount(count - 1)}>decreament</button>
                <h2>Count: {count}</h2>
            </main>
        </div>
    )
}

export default UseState