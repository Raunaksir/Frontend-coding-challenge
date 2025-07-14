import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
  const [book, setBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publicationYear: ''
  });

  const { isbn } = useParams();
  const navigate = useNavigate();

  // ✅ Load book details when the component mounts
  useEffect(() => {
    if (!isbn) {
      alert("No ISBN provided in URL.");
      return;
    }

    console.log("Fetching book with ISBN:", isbn);
    axios.get(`/api/books/${isbn}`)
      .then((res) => {
        console.log("Book found:", res.data);
        setBook(res.data);
      })
      .catch((err) => {
        console.error("Failed to load book:", err);
        alert("Failed to load book. Please check if the ISBN exists.");
      });
  }, [isbn]);

  // ✅ Submit update
  const handleUpdate = async () => {
    try {
      await axios.put(`/api/books/${isbn}`, book);
      alert("Book updated successfully!");
      navigate('/books');
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book.");
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Edit Book</h2>
      <input value={book.isbn} disabled />
      <br /><br />
      <input
        type="text"
        value={book.title}
        placeholder="Title"
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />
      <br /><br />
      <input
        type="text"
        value={book.author}
        placeholder="Author"
        onChange={(e) => setBook({ ...book, author: e.target.value })}
      />
      <br /><br />
      <input
        type="number"
        value={book.publicationYear}
        placeholder="Publication Year"
        onChange={(e) => setBook({ ...book, publicationYear: e.target.value })}
      />
      <br /><br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditBook;
