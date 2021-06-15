import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {Todo} from "./entities/todo.entity";
import {TodoService} from "./todo.service";
import {GetPaginatedTodoDto} from "./dto/get-Paginated-todo-dto";
import {AddTodoDto} from "./dto/add-todo.dto";
import {UpperAndFusionPipe} from "../pipes/upper-and-fusion.pipe";
import {DurationInterceptor} from "../interceptors/duration.interceptor";
import {ConfigService} from "@nestjs/config";

@UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(@Query() mesQueryPararams: GetPaginatedTodoDto): Todo[] {
    console.log(mesQueryPararams instanceof GetPaginatedTodoDto);
    console.log(mesQueryPararams)
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(@Param('id', ParseIntPipe) id
  ) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo)
  }

  @Delete(':id')
  deleteTodo(@Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_FOUND
             })) id
  ) {
      console.log(typeof id)
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  modifyTodo(@Param('id', ParseIntPipe) id,
             @Body() newTodo: Partial<Todo>) {
    return this.todoService.updateTodo(id, newTodo);
  }

  @Post('pipe')
  testPipe(@Param('data', UpperAndFusionPipe) paramData,
           @Body()data){
    console.log(data)
    return(data)
  }
}
