import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            {
                id: '1',
                title: 'Larn React',
                completed: true
            },
            {
                id: '2',
                title: 'Read a book',
                completed: false
            },
        ],
        activeFilter: 'all'
    },
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.items.push(action.payload)
            },
            prepare: ({ title }) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        completed: false,
                    }
                }
            }
        },
        toggle: (state, action) => {
            const id = action.payload;
            const item = state.items.find(oItem => oItem.id === id);
            item.completed = !item.completed
        },
        destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter(oItem => oItem.id !== id);
            state.items = filtered;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(oItem => !oItem.completed);
            state.items = filtered;
        }
    },
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


export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;