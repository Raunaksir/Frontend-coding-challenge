package com.example.bookapi.service;

import com.example.bookapi.exception.BookNotFoundException;
import com.example.bookapi.model.Book;
import com.example.bookapi.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    public Book getBookByIsbn(String isbn) {
        return repository.findById(isbn)
                .orElseThrow(() -> new BookNotFoundException("Book with ISBN " + isbn + " not found."));
    }

    public Book addBook(Book book) {
        return repository.save(book);
    }

    public Book updateBook(String isbn, Book updatedBook) {
        Book existing = getBookByIsbn(isbn);
        existing.setTitle(updatedBook.getTitle());
        existing.setAuthor(updatedBook.getAuthor());
        existing.setPublicationYear(updatedBook.getPublicationYear());
        return repository.save(existing);
    }

    public void deleteBook(String isbn) {
        Book book = getBookByIsbn(isbn);
        repository.delete(book);
    }
}
