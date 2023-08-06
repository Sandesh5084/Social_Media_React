import React from 'react';
import useCount from './CounterHook';

function CustomHook() {
    let [count, increase, decrease, reset] = useCount();
    return (
        <div>
            <h1>Counter</h1>
            <div>
                {count}
            </div>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default CustomHook