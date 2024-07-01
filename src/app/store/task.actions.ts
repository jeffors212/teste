import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';
export const loadTasks = createAction('[Task List] Load Tasks');


export const addTask = createAction(
  '[Task List] Add Task',
  props<{ task: Task }>()
);


export const updateTask = createAction(
  '[Task List] Update Task',
  props<{ id: number; title: string; description: string }>()
);


export const deleteTask = createAction(
  '[Task List] Delete Task',
  props<{ id: number }>()
);
