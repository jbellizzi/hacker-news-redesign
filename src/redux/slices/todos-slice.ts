import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: (state, action: PayloadAction<Todo>) => {
      state.push({ id: action.payload.id, text: action.payload.text, completed: false });
    },
    todoToggled: (state, action: PayloadAction<Todo>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) todo.completed = !todo.completed;
    },
  },
});

export const { todoAdded, todoToggled } = todosSlice.actions;
export const { reducer: todosReducer } = todosSlice;
