package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoResource {

	private TodoService todoService;

	public TodoResource(TodoService todoService) {
		this.todoService = todoService;
	}

	@GetMapping("/username/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoService.findByUsername(username);
	}

	@GetMapping("/username/{username}/todos/{id}")
	public Todo retrieveTodoUsingId(@PathVariable String username, @PathVariable int id) {
		return todoService.findById(id);

	}

	@DeleteMapping("/username/{username}/todos/{id}")
	public ResponseEntity<Void> DeleteTodoUsingId(@PathVariable String username, @PathVariable int id) {
		todoService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/username/{username}/todos/{id}")
	public Todo UpdateTodoUsingId(@PathVariable String username, @PathVariable int id, @RequestBody Todo todo) {
		todoService.updateTodo(todo);
		return todo;
	}

	@PostMapping("/username/{username}/todos")
	public Todo AddTodo(@PathVariable String username, @RequestBody Todo todo) {
		Todo createdtodo = todoService.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
		return createdtodo;
	}

}
