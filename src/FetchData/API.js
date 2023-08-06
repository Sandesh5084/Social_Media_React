import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './API.css';


function API() {
    let [msg, setMsg] = useState("");
    let excuse = (name) => {
        Axios.get(`https://excuser-three.vercel.app/v1/excuse/${name}/`).then((res) => setMsg(res.data[0].excuse))
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>GENERATE EXCUSE</h1>
            <button onClick={() => excuse("party")}>Party</button>
            <button onClick={() => excuse("family")}>family</button>
            <button onClick={() => excuse("office")}>Office</button>
            <p>{msg}</p>
        </div>

    )
}

export default API