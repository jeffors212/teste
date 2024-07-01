import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as TaskActions from '../../store/task.actions';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule]
})
export class TaskComponent {
  taskForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>, 
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      this.store.dispatch(TaskActions.addTask({ task: this.taskForm.value }));
      this.message = 'Task added successfully!';
      setTimeout(() => {
        this.router.navigate(['/tasks']);
      }, 2000); 
    } else {
      this.message = 'Please fill in all fields!';
    }
  }
}
