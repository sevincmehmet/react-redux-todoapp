import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter } from "../redux/todos/todosSlice";
import { clearCompletedAsync } from "../redux/todos/services";

export default function ContentFooter() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.todos.items);
    const itemsLeft = items.filter(oItem => !oItem.completed).length;

    const activeFilter = useSelector(state => state.todos.activeFilter);

    useEffect(() => {
        localStorage.setItem('activeFilter', activeFilter)
    }, [activeFilter])


    const handleComplateDestroy = () => {
        if(items.filter((oItem) => oItem.completed).length <= 0)
            return alert('The content of your complate todos is empty')     

        if (window.confirm('Are you sure ?'))
            dispatch(clearCompletedAsync())
    }

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{itemsLeft}</strong>
                {` item${itemsLeft > 1 ? 's' : ''} left`}
            </span>

            <ul className="filters">
                <li>
                    <a
                        href="#/"
                        className={activeFilter === 'all' ? "selected" : ''}
                        onClick={() => dispatch(changeActiveFilter('all'))}
                    >All</a>
                </li>
                <li>
                    <a
                        href="#/"
                        className={activeFilter === 'active' ? "selected" : ''}
                        onClick={() => dispatch(changeActiveFilter('active'))}
                    >Active</a>
                </li>
                <li>
                    <a
                        href="#/"
                        className={activeFilter === 'completed' ? "selected" : ''}
                        onClick={() => dispatch(changeActiveFilter('completed'))}
                    >Completed</a>
                </li>
            </ul>

            <button
                className="clear-completed"
                onClick={() => handleComplateDestroy()}
            >
                Clear completed
            </button>
        </footer>)
}