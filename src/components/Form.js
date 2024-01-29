import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/todosSlice";

export default function Form() {
    const [title, setTitle] = useState('')

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        if (title.trim() === '')
            return setTitle('')

        e.preventDefault();

        dispatch(addTodo({ title }))
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
            />
        </form>
    )
}