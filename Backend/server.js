require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });

// app.listen(process.env.PORT, () => {
//   console.log(`server is running on port ${process.env.PORT}`);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
