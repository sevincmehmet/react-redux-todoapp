import { createSlice } from "@reduxjs/toolkit";

import { getTodosAsync, addTodosAsync, toggleTodoAsync, removeTodoAsync } from "./services";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [

        ],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem('activeFilter'),
        addNewTodo: {
            error: null,
            isLoading: false
        }
    },
    reducers: {
        // toggle: (state, action) => {
        //     const id = action.payload;
        //     const item = state.items.find(oItem => oItem.id === id);
        //     item.completed = !item.completed
        // },
        // destroy: (state, action) => {
        // const id = action.payload;
        // const filtered = state.items.filter(oItem => oItem.id !== id);
        // state.items = filtered;
        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(oItem => !oItem.completed);
            state.items = filtered;
        }
    },
    extraReducers: (builder) => {
        // get todos
        builder.addCase(getTodosAsync.pending, (state, action) => {
            state.isLoading = true;

        })
        builder.addCase(getTodosAsync.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getTodosAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        // add todo
        builder.addCase(addTodosAsync.pending, (state, action) => {
            state.addNewTodo.isLoading = true;
        })
        builder.addCase(addTodosAsync.fulfilled, (state, action) => {
            state.items.push(action.payload)
            state.addNewTodo.isLoading = false;
        })
        builder.addCase(addTodosAsync.rejected, (state, action) => {
            state.addNewTodo.isLoading = false;
            state.addNewTodo.error = action.error.message;
        })
        //toggle todo
        builder.addCase(toggleTodoAsync.fulfilled, (state, action) => {
            const { id, completed } = action.payload;
            const index = state.items.findIndex((oItem) => oItem.id === id);
            state.items[index].completed = completed
        })
        //remove todo
        builder.addCase(removeTodoAsync.fulfilled, (state, action) => {
            const id = action.payload
            const filtered = state.items.filter((oItem) => oItem.id !== id)
            state.items = filtered
        })
    }
})

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.items;
    }

    return state.todos.items.filter(todo =>
        state.todos.activeFilter === 'active'
            ? !todo.completed
            : todo.completed
    )
}


export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;