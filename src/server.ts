import app from "./app";
const port = process.env.PORT || 3000;

import connection from "./database/connection";
async function testConnection() {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

app.server.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
