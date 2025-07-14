package com.example.bookapi.controller;

import com.example.bookapi.model.Book;
import com.example.bookapi.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Autowired
    private ObjectMapper objectMapper;

    private Book sampleBook() {
        return new Book("1234567890", "Spring Boot", "Raunak", 2025);
    }

    @Test
    public void testGetAllBooks() throws Exception {
        List<Book> books = List.of(sampleBook());
        Mockito.when(bookService.getAllBooks()).thenReturn(books);

        mockMvc.perform(get("/api/books"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$[0].isbn").value("1234567890"));
    }

    @Test
    public void testGetBookByIsbn() throws Exception {
        Mockito.when(bookService.getBookByIsbn("1234567890")).thenReturn(sampleBook());

        mockMvc.perform(get("/api/books/1234567890"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.title").value("Spring Boot"));
    }

    @Test
    public void testAddBook() throws Exception {
        Book book = sampleBook();
        Mockito.when(bookService.addBook(Mockito.any(Book.class))).thenReturn(book);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(book)))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.isbn").value("1234567890"));
    }

    @Test
    public void testUpdateBook() throws Exception {
        Book updated = sampleBook();
        updated.setTitle("Updated Title");

        Mockito.when(bookService.updateBook(Mockito.eq("1234567890"), Mockito.any(Book.class)))
               .thenReturn(updated);

        mockMvc.perform(put("/api/books/1234567890")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updated)))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.title").value("Updated Title"));
    }

    @Test
    public void testDeleteBook() throws Exception {
        Mockito.doNothing().when(bookService).deleteBook("1234567890");

        mockMvc.perform(delete("/api/books/1234567890"))
               .andExpect(status().isNoContent());
    }
}
