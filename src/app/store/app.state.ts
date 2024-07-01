import { ActionReducerMap } from '@ngrx/store';
import { taskReducer } from './task.reducer';
import { Task } from '../models/task.model'; // Ajuste o caminho se necessário

export interface AppState {
  tasks: Task[];
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer
};
