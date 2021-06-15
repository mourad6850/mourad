import {Body, Injectable, NotFoundException, Param} from '@nestjs/common';
import {Todo} from "./entities/todo.entity";
import {AddTodoDto} from "./dto/add-todo.dto";

@Injectable()
export class TodoService {
    todos: Todo[] = [];

    getTodos(): Todo[] {
        console.log(this.todos)
        return this.todos;
    }

    addTodo(newTodo: AddTodoDto): Todo {
        const {name, description} = newTodo;
        let id;
        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        }else
            id = 1;
        const todo = {
            id,
            name,
            description,
            createdAt: new Date()
        }
        this.todos.push(todo);
        return todo;
    }

    getTodoById(id: number): Todo {
        const todo = this.todos.find((actualTodo: Todo) => actualTodo.id === id);
        if (todo)
            return todo;
        throw new NotFoundException(`le todo d'id ${id} n'existe pas`)
    }

    deleteTodo(id: number) {
        // chercher le toto via l'id
        const index = this.todos.findIndex((todo: Todo) => todo.id === +id);
        // supprimer le todo avec splice s'il existe
        if(index >=0 ) {
            this.todos.splice(index, 1);
            return `le toto avec l'id ${id} a été supprimé `;
        }else {
            // s'il n'existe pas déclencher une erreur
            throw new NotFoundException(`le toto avec l'id ${id} n'existe pas `)
        }
        return {
            message: `le toto avec l'id ${id} a été supprimé avec succés `,
            count: 1
        }
    }

    updateTodo(id: number,newTodo: Partial<AddTodoDto>) {
        const todo = this.getTodoById(id);
        todo.name = newTodo.name? newTodo.name : todo.name;
        todo.description = newTodo.description? newTodo.description : todo.description;
        return todo;
    }
}
