import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as TaskActions from '../../store/task.actions';
import { Task } from '../../models/task.model';
import { MaterialModule } from '../../material.module'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editingForms: { [key: number]: FormGroup } = {}; 

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.store.select(state => state.tasks).subscribe(tasks => {
      this.tasks = tasks;
      this.initForms();
    });
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  initForms() {
    this.tasks.forEach(task => {
      if (!this.editingForms[task.id]) {
        this.editingForms[task.id] = this.fb.group({
          title: [task.title, Validators.required],
          description: [task.description, Validators.required]
        });
      }
    });
  }

  enableEditing(task: Task) {
    this.editingForms[task.id].setValue({
      title: task.title,
      description: task.description
    });
  }

  updateTask(taskId: number) {
    if (this.editingForms[taskId].valid) {
      const formValue = this.editingForms[taskId].value;
      this.store.dispatch(TaskActions.updateTask({
        id: taskId,
        title: formValue.title,
        description: formValue.description
      }));
      this.cancelEditing(taskId);
    }
  }

  deleteTask(id: number) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  cancelEditing(taskId: number) {
    if (this.editingForms[taskId]) {
      this.editingForms[taskId].reset();
    }
  }
}
