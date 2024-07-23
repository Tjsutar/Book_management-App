import axios from 'axios';

const baseURL= 'http://localhost:5002/api'

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${baseURL}/books`);

    if (response.status !== 200) {
      throw new Error('Error fetching data.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getBookTypes = async () => {
  try {
    const response = await axios.get(`${baseURL}/book-types`);

    if (response.status !== 200) {
      throw new Error('Error fetching data.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`${baseURL}/genres`);

    if (response.status !== 200) {
      throw new Error('Error fetching data.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/books/${id}`);

    if (response.status !== 200) {
      throw new Error('Error fetching data.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${baseURL}/books`, bookData);

    if (response.status !== 201) {
      throw new Error('Error creating book.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${baseURL}/books/${id}`, bookData);

    if (response.status !== 200) {
      throw new Error('Error updating book.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deactivateBook = async (id) => {
  try {
    const response = await axios.put(`${baseURL}/books/${id}/deactivate`);

    if (response.status !== 200) {
      throw new Error('Error deactivating book.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
