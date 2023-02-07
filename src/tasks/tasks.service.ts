import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { createTaskDTO } from './dto/create-task_dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks() : Task[] {
        return this.tasks;
    };

    createTask(createTaskDTO) :Task {
        const { title, description } = createTaskDTO;
        const task : Task = {
            id : uuid.v1(),
            title,
            description,
            status : TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    };

    getTaskById(id : string) : Task {
        return this.tasks.find(task => task.id === id);
    };

    updateTaskById(id : string, createTaskDTO : createTaskDTO) {
        const { title, description } = createTaskDTO;
        const newTask : Task = {
            id,
            title,
            description,
            status : TaskStatus.IN_PROGRESS
        };
        this.tasks.map(task => task.id === id ? task : newTask);
        return newTask;
    };

    updateTaskStatus(id : string, status : TaskStatus) : Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    };

    deleteTaskById(id : string) : void{
        this.tasks = this.tasks.filter(task => task.id !== id);
    };

}
