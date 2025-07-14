import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [book, setBook] = useState({ isbn: '', title: '', author: '', publicationYear: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.post('/api/books', book);
    navigate('/books');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Add Book</h2>
      <input placeholder="ISBN" onChange={e => setBook({ ...book, isbn: e.target.value })} />
      <br /><br />
      <input placeholder="Title" onChange={e => setBook({ ...book, title: e.target.value })} />
      <br /><br />
      <input placeholder="Author" onChange={e => setBook({ ...book, author: e.target.value })} />
      <br /><br />
      <input placeholder="Year" type="number" onChange={e => setBook({ ...book, publicationYear: e.target.value })} />
      <br /><br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddBook;