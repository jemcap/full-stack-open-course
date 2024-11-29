const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogController");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./utils/config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use("/api/blogs", blogRouter);

app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
