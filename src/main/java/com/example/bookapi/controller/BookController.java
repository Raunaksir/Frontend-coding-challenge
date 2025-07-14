package com.example.bookapi.controller;

import com.example.bookapi.model.Book;
import com.example.bookapi.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService service;

    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return service.getAllBooks();
    }

    // Get book by ISBN
    @GetMapping("/{isbn}")
    public ResponseEntity<Book> getBook(@PathVariable String isbn) {
        Book book = service.getBookByIsbn(isbn);
        return ResponseEntity.ok(book);
    }

    // Add new book
    @PostMapping
    public ResponseEntity<Book> addBook(@Valid @RequestBody Book book) {
        return ResponseEntity.ok(service.addBook(book));
    }

    // Update existing book
    @PutMapping("/{isbn}")
    public ResponseEntity<Book> updateBook(@PathVariable String isbn, @Valid @RequestBody Book book) {
        return ResponseEntity.ok(service.updateBook(isbn, book));
    }

    // Delete book by ISBN
    @DeleteMapping("/{isbn}")
    public ResponseEntity<Void> deleteBook(@PathVariable String isbn) {
        service.deleteBook(isbn);
        return ResponseEntity.noContent().build();
    }
}
