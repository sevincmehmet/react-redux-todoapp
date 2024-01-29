import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggle, destroy, selectFilteredTodos } from "../redux/todos/todosSlice";

export default function TodoList() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos)

    const handleDestroy = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(destroy(id))
        }
    }


    return (
        <ul className="todo-list">
            {filteredTodos.map((oItem) => {
                return (
                    <li className={oItem.completed ? 'completed' : ''} key={oItem.id}>
                        <div className="view">
                            <input
                                className="toggle"
                                type="checkbox"
                                checked={oItem.completed}
                                onChange={() => dispatch(toggle(oItem.id))}
                            />
                            <label>{oItem.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(oItem.id)}></button>
                        </div>
                    </li>)
            })}
        </ul>
    )
}