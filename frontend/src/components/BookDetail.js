import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.getBookById(id);
      setBook(res);
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="text-center  text-blue-700 bg-gray-100 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h1 className=" font-bold m-4">{book.title}</h1>
      <p className=" m-4">Author: {book.author}</p>
      <p className=" m-4">Type: {book.BookType.type_name}</p>
      <p className=" m-4">Genre: {book.Genre.genre_name}</p>
      <p className=" m-4">Publication: {book.publication}</p>
      <p className=" m-4">Pages: {book.pages}</p>
      <p className=" m-4">Price: {book.price}</p>
      <img
        src={`http://localhost:3000/uploads/${book.cover_photo}`}
        alt={book.title}
        className="mx-auto rounded-lg shadow-md"
      />
    </div>
  );
};

export default BookDetail;
