const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(require("./routes"));

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
