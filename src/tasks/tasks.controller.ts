import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';
import { TaskStatusValidationpipe } from './pipes/task-status-validation.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

    @Get()
    getAllTasks(@Query(ValidationPipe) filterDTO : GetTasksFilterDTO) : Task[]{
        if(Object.keys(filterDTO).length) {
            return this.tasksService.getTaskWithFilters(filterDTO)
        }
        else{
            return this.tasksService.getAllTasks();
        }
    };

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO : createTaskDTO) : Task{
        return this.tasksService.createTask(createTaskDTO);
    };

    @Get('/:id')
    getTaskById(@Param('id') id : string) : Task{ 
        return this.tasksService.getTaskById(id);
    };

    @Patch('/:id')
    updateTaskBy(@Param('id') id : string, @Body() createTaskDTO : createTaskDTO){
        return this.tasksService.updateTaskById(id, createTaskDTO);
    };

    @Patch('/status/:id')
    updateStatus(@Param('/:id') id : string, @Body('status', TaskStatusValidationpipe) status : TaskStatus) : Task{
        return this.tasksService.updateTaskStatus(id, status);
    };

    @Delete('/:id')
    deleteTaskById(@Param('id') id : string) : void{
        this.tasksService.deleteTaskById(id);
    }
}
