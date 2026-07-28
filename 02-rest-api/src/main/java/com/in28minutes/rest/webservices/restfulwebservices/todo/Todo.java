package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.time.LocalDate;

import com.in28minutes.rest.webservices.restfulwebservices.todo.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Todo {

	public Todo() {
		
	}
	
	public Todo(int id, String username, String description, LocalDate targetDate, Status status) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
		this.status = status;
	}

	@Id
	@GeneratedValue
	private int id;

	private String username;
	
	private String description;
	private LocalDate targetDate;
	@Enumerated(EnumType.STRING)
	private Status status;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}

	public Status getStatus() {
	    return status;
	}

	public void setStatus(Status status) {
	    this.status = status;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", username=" + username + ", description=" + description + ", targetDate="
				+ targetDate + ", status=" + status + "]";
	}

}