import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import * as api from '../api';

const EditBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const res = await api.getBookById(id);
            setBook(res);
        };
        fetchBook();
    }, [id]);

    const handleSave = async (formData) => {
        await api.updateBook(id, formData);
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
  <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
  <div className="bg-white shadow-md rounded-lg px-8 py-6">
    <BookForm book={book} onSave={handleSave} />
  </div>
</div>

    );
};

export default EditBook;
