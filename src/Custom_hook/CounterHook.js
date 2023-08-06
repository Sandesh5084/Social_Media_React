import { useState } from "react";

let useCount = () => {
    let [count, setCount] = useState(0);

    let increase = () => {
        setCount(count + 1);
    }
    let decrease = () => {
        setCount(count - 1);
    }
    let reset = () => {
        setCount(0);
    }
    return [count, increase, decrease, reset]
}
export default useCount;