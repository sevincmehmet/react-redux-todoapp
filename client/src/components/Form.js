import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodosAsync } from "../redux/todos/services";
import Loading from "./Loading";

export default function Form() {
    const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading)
    const error = useSelector((state) => state.todos.addNewTodo.error)
    const [title, setTitle] = useState('')

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        if (title.trim() === '')
            return setTitle('')

        e.preventDefault();

        await dispatch(addTodosAsync({ title }))
        setTitle('')
    }

    if (error)
        return alert(error)

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: 'center' }}>
            <input
                disabled={isLoading}
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
            />
            {isLoading && <Loading />}

        </form>
    )
}