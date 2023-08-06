import React, { useState } from 'react';
import { AppContext } from '../MainRoute';
import { useContext } from 'react';

function ChangeProfilePage() {
    let [newname, setnewname] = useState("");

    let { setname } = useContext(AppContext);

    return (
        <div>
            <p>ChangeProfilePage</p>
            <input onChange={(e) => { setnewname(e.target.value) }}></input>
            <button onClick={setname(newname)}>Change</button>
        </div>
    )
}

export default ChangeProfilePage