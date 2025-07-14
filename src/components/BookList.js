import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import './BookTable.css'; // ✅ import the table CSS

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  const deleteBook = async (isbn) => {
    if (!window.confirm(`Are you sure you want to delete book with ISBN ${isbn}?`)) return;

    try {
      await axios.delete(`/api/books/${isbn}`);
      alert("Book deleted");
      loadBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="table-container">
      <h2>📚 Book List</h2>
      <button className="add-button" onClick={() => navigate('/add')}>Add Book</button>
      <table className="book-table">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map(book => (
              <tr key={book.isbn}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publicationYear}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${book.isbn}`)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteBook(book.isbn)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No books found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
