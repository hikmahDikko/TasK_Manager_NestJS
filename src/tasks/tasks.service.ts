import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { createTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks() : Task[] {
        return this.tasks;
    };

    getTaskWithFilters(filterDTO : GetTasksFilterDTO) : Task[]{
        const { status, search } = filterDTO;

        let tasks = this.getAllTasks();
        
        if(status){
            tasks = tasks.filter(task => task.status === status)
        }

        if(search){
            tasks = tasks.filter(tasks => 
                tasks.title.includes(search) ||
                tasks.description.includes(search)      
            );
        }

        return tasks;
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
        const found = this.tasks.find(task => task.id === id);

        if(!found) {
            throw new NotFoundException();
        }

        return found;
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
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    };

}
