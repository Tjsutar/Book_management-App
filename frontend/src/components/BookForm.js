import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../api";

const BookForm = ({ book, onSave }) => {
  const [title, setTitle] = useState(book ? book.title : "");
  const [author, setAuthor] = useState(book ? book.author : "");
  const [type_id, setTypeId] = useState(book ? book.type_id : "");
  const [genre_id, setGenreId] = useState(book ? book.genre_id : "");
  const [publication, setPublication] = useState(book ? book.publication : "");
  const [pages, setPages] = useState(book ? book.pages : "");
  const [price, setPrice] = useState(book ? book.price : "");
  const [cover_photo, setCoverPhoto] = useState(null);

  const [bookTypes, setBookTypes] = useState([]);
  const [genres, setGenres] = useState([]);

  console.log("bookTypes", bookTypes);
  console.log("genres", genres);

  const history = useHistory();

  useEffect(() => {
    const fetchTypesAndGenres = async () => {
      const typesRes = await api.getBookTypes();
      const genresRes = await api.getGenres();
      setBookTypes(typesRes);
      setGenres(genresRes);
    };
    fetchTypesAndGenres();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("type_id", type_id);
    formData.append("genre_id", genre_id);
    formData.append("publication", publication);
    formData.append("pages", pages);
    formData.append("price", price);
    if (cover_photo) formData.append("cover_photo", cover_photo);

    onSave(formData);
    history.push("/");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg overflow-hidden">
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="mb-4">
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="type_id" className="block text-sm font-medium text-gray-700">Type:</label>
      <select
        id="type_id"
        name="type_id"
        value={type_id}
        onChange={(e) => setTypeId(e.target.value)}
        required
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        <option value="">Select Type</option>
        {bookTypes.map((type) => (
          <option key={type.id} value={type.id}>{type.type_name}</option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label htmlFor="genre_id" className="block text-sm font-medium text-gray-700">Genre:</label>
      <select
        id="genre_id"
        name="genre_id"
        value={genre_id}
        onChange={(e) => setGenreId(e.target.value)}
        required
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label htmlFor="publication" className="block text-sm font-medium text-gray-700">Publication:</label>
      <input
        type="text"
        id="publication"
        name="publication"
        value={publication}
        onChange={(e) => setPublication(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="pages" className="block text-sm font-medium text-gray-700">Pages:</label>
      <input
        type="number"
        id="pages"
        name="pages"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">Cover Photo:</label>
      <input
        type="file"
        id="coverPhoto"
        name="coverPhoto"
        onChange={(e) => setCoverPhoto(e.target.files[0])}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>

    <div className="mb-4">
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Save
      </button>
    </div>
  </form>
</div>

  );
};

export default BookForm;
