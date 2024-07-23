const db = require("../db/index");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("cover_photo");

exports.getAllBooks = async (req, res) => {
  try {
    // Join books with book_types and genres tables to include type and genre details
    const [books] = await db.query(`
        SELECT b.id, b.title, b.author, b.publication, b.pages, b.price, b.cover_photo, b.is_active,
               bt.type_name AS type, g.genre_name AS genre
        FROM books b
        LEFT JOIN book_types bt ON b.type_id = bt.id
        LEFT JOIN genres g ON b.genre_id = g.id
        WHERE b.is_active = TRUE
      `);

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookTypes = async (req, res) => {
  try {
    const [bookTypes] = await db.query("SELECT * FROM book_types");
    res.json(bookTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGenres = async (req, res) => {
  try {
    const [genres] = await db.query("SELECT * FROM genres");
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const [book] = await db.query(
      "SELECT * FROM books WHERE id = ? AND is_active = TRUE",
      [req.params.id]
    );
    if (book.length === 0)
      return res.status(404).json({ error: "Book not found" });
    res.json(book[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBook = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { title, author, type_id, genre_id, publication, pages, price } =
      req.body;

    try {
      const [result] = await db.query(
        "INSERT INTO books (title, author, type_id, genre_id, publication, pages, price, cover_photo, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE)",
        [
          title,
          author,
          type_id,
          genre_id,
          publication,
          pages,
          price,
          req.file ? req.file.filename : null,
        ]
      );
      const [newBook] = await db.query("SELECT * FROM books WHERE id = ?", [
        result.insertId,
      ]);
      res.status(201).json(newBook[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.updateBook = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { title, author, type_id, genre_id, publication, pages, price } =
      req.body;

    try {
      const [book] = await db.query(
        "SELECT * FROM books WHERE id = ? AND is_active = TRUE",
        [req.params.id]
      );
      if (book.length === 0)
        return res.status(404).json({ error: "Book not found" });

      await db.query(
        "UPDATE books SET title = ?, author = ?, type_id = ?, genre_id = ?, publication = ?, pages = ?, price = ?, cover_photo = ? WHERE id = ?",
        [
          title,
          author,
          type_id,
          genre_id,
          publication,
          pages,
          price,
          req.file ? req.file.filename : book[0].cover_photo,
          req.params.id,
        ]
      );

      const [updatedBook] = await db.query("SELECT * FROM books WHERE id = ?", [
        req.params.id,
      ]);
      res.json(updatedBook[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.deactivateBook = async (req, res) => {
  try {
    const [book] = await db.query("SELECT * FROM books WHERE id = ?", [
      req.params.id,
    ]);
    if (book.length === 0)
      return res.status(404).json({ error: "Book not found" });

    await db.query("UPDATE books SET is_active = FALSE WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Book deactivated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
