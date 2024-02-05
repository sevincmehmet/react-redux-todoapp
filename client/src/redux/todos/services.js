import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {

    const res = await axios(`${process.env.REACT_APP_API_BASE_END_POINT}/todos`)
    return res.data;
})

export const addTodosAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {

    const res = await axios.post(`${process.env.REACT_APP_API_BASE_END_POINT}/todos`, data)
    return res.data;
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({ id, data }) => {

    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_END_POINT}/todos/${id}`, data)
    return res.data;
})

export const removeTodoAsync = createAsyncThunk('todos/removeToAsync', async (id) => {

    await axios.delete(`${process.env.REACT_APP_API_BASE_END_POINT}/todos/${id}`)
    return id;
})