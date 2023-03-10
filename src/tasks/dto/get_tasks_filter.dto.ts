import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDTO{
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status : TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search : string;
}