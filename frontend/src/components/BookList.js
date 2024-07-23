import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await api.getAllBooks();
      setBooks(res);
    };
    fetchBooks();
  }, []);

  const handleDeactivate = async (id) => {
    await api.deactivateBook(id);
    if (books)
      setBooks(
        books?.map((book) =>
          book.id === id ? { ...book, is_active: false } : book
        )
      );
  };

  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-4 text-center">Books</h1>
  <Link to="/add" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4 inline-block">
    Add Book
  </Link>
  <div className="-mx-4 overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border-b border-gray-200 px-4 py-2">Title</th>
          <th className="border-b border-gray-200 px-4 py-2">Author</th>
          <th className="border-b border-gray-200 px-4 py-2">Type</th>
          <th className="border-b border-gray-200 px-4 py-2">Genre</th>
          <th className="border-b border-gray-200 px-4 py-2">Publication</th>
          <th className="border-b border-gray-200 px-4 py-2">Pages</th>
          <th className="border-b border-gray-200 px-4 py-2">Price</th>
          <th className="border-b border-gray-200 px-4 py-2">Cover Photo</th>
          <th className="border-b border-gray-200 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books
          ?.filter((book) => book.is_active)
          ?.map((book) => (
            <tr key={book?.id} className="hover:bg-gray-50">
              <td className="border-b border-gray-200 px-4 py-2">{book?.title}</td>
              <td className="border-b border-gray-200 px-4 py-2">{book?.author}</td>
              <td className="border-b border-gray-200 px-4 py-2">{book?.type}</td>
              <td className="border-b border-gray-200 px-4 py-2">{book?.genre}</td>
              <td className="border-b border-gray-200 px-4 py-2">{book?.publication}</td>
              <td className="border-b border-gray-200 px-4 py-2">{book?.pages}</td>
              <td className="border-b border-gray-200 px-4 py-2">{book?.price}</td>
              <td className="border-b border-gray-200 px-4 py-2">
                <img
                  src={`http://localhost:5002/uploads/${book?.cover_photo}`}
                  alt={book.title}
                  width="50"
                  className="rounded-md"
                />
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                <Link to={`/edit/${book.id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDeactivate(book.id)} className="text-red-500 hover:text-red-700">
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default BookList;
