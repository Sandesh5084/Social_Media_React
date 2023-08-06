import React from "react";
import { useState } from "react";
import './Main.css';

function Main() {
    const [task, settask] = useState();
    const [list, setlist] = useState([]);

    let handleString = (e) => {
        settask(e.target.value
        );
    }

    let handleList = () => {
        let newtask = {
            id: list.length === 0 ? 1 : list[list.length - 1].id + 1,
            name: task,
            completed: false
        }
        setlist([...list, newtask]);
    }

    let handleDelete = (itemid) => {
        setlist(list.filter((eachtask) => eachtask.id !== itemid))
    }

    let handleComplete = (id) => {
        setlist(list.map((item) => {
            return (item.id === id ? { ...item, completed: true } : item);
        }))
    }

    return (
        <div>
            <h1>TODO LIST</h1>
            <div>
                <input onChange={handleString}></input>
                <button onClick={handleList} >Add</button>
            </div>
            <div>
                {
                    list.map((listItem) => {
                        return (
                            <div style={{ backgroundColor: listItem.completed ? "green" : "white" }}>
                                {listItem.name}
                                <button onClick={() => handleDelete(listItem.id)}>X</button>
                                <button onClick={() => handleComplete(listItem.id)} >Completed</button>
                            </div>
                        );
                    })
                }
            </div>
        </div >
    );
}
export default Main;