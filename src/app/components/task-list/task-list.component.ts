import { Component } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: any[] = [];
  editingId: number | null = null;
  editingTitle: string = '';
  editingDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  enableEditing(task: any) {
    this.editingId = task.id;
    this.editingTitle = task.title;
    this.editingDescription = task.description;
  }

  updateTask(id: number) {
    if (this.editingId !== null) {
      const updatedTask = { title: this.editingTitle, description: this.editingDescription };
      this.taskService.updateTask(id, updatedTask).subscribe(() => {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...updatedTask };
        }
        this.editingId = null; // Reset editing mode
      });
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  cancelEditing() {
    this.editingId = null;
  }
}
