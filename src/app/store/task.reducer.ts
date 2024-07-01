import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';

export const initialState: Task[] = [];

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => state), 
  on(TaskActions.addTask, (state, { task }) => [...state, task]),
  on(TaskActions.updateTask, (state, { id, title, description }) =>
    state.map(task => task.id === id ? { ...task, title, description } : task)
  ),
  on(TaskActions.deleteTask, (state, { id }) => state.filter(task => task.id !== id))
);

