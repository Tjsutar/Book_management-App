import React from 'react';
import BookForm from '../components/BookForm';
import * as api from '../api';

const AddBook = () => {
    const handleSave = async (formData) => {
        await api.createBook(formData);
    };

    return (
        <div className="container mx-auto px-2 py-4 ">
        <h1 className="text-2xl font-bold mb-4">Add Book</h1>
        <div className="bg-white shadow-md rounded-lg px-5 py-2">
          <BookForm onSave={handleSave} />
        </div>
      </div>

    );
};

export default AddBook;
