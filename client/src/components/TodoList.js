import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeTodoAsync, getTodosAsync, toggleTodoAsync } from "../redux/todos/services";
import { selectFilteredTodos } from "../redux/todos/todosSlice";

import Loading from "./Loading";
import Error from "./Error";

export default function TodoList() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos)
    const isLoading = useSelector((state) => state.todos.isLoading)
    const error = useSelector((state) => state.todos.error)

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    const handleDestroy = async (id) => {
        if (window.confirm('Are you sure?')) {
            await dispatch(removeTodoAsync(id))
        }
    }

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoAsync({ id, data: { completed } }))
    }

    if (isLoading)
        return <Loading />

    if (error)
        return <Error message={error} />

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
                                onChange={() => handleToggle(oItem.id, !oItem.completed)}
                            />
                            <label>{oItem.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(oItem.id)}></button>
                        </div>
                    </li>)
            })}
        </ul>
    )
}