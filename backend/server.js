const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.static("../frontend"));
app.use(cors());
app.use(express.json());

app.get("/lists", (req, res) => {
  console.log("GET request received on /lists");
  db.all("SELECT * FROM lists ", (err, rows) => {
    if (err) {
      console.log("Error on db: "+ err);
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

app.post("/lists", (req, res) => {
  const { name, description} = req.body;

  db.run(
    "insert into lists (name, description) values (?, ?)",
    [name, description],
    function (err) {
      if (err) {
        console.log("Error on db: "+ err);
        return res.status(500).json(err);
      }
      res.json({
        id: this.lastID,
        name
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
app.delete("/lists/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM lists  WHERE id = ?",
    [id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        message: "List deleted successfully"
      });
    }
  );
});
app.put("/lists/:id", (req, res) => {

  const id = req.params.id;  
  const { name, description } = req.body;

  db.run(
    "UPDATE lists SET name = ?, description = ? WHERE id = ?",
    [name, description, id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        message: "List updated successfully"
      });
    }
  );
}); 


app.get("/lists/:id/items", (req, res) => {

  const listId = req.params.id;

  db.all(
    "SELECT * FROM items WHERE id_list = ?",
    [listId],
    (err, rows) => {

      if (err) {
        console.log(err)
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

});
app.put("/items/:id", (req, res) => {

  const id = req.params.id;
  const { name, stato } = req.body;

  db.run(
    "UPDATE items SET name = ?, stato = ? WHERE id = ?",
    [name, stato, id],
    function(err){
      if(err) return res.status(500).json(err);

      res.json({ message: "item updated" });
    }
  );

});

app.post("/lists/:id/items", (req, res) => {

  const listId = req.params.id;
  const { name } = req.body;

  db.run(
    "INSERT INTO items (name, stato, id_list) VALUES (?, ?, ?)",
    [name, "todo", listId],
    function(err){
      if(err) return res.status(500).json(err);

      res.json({ id: this.lastID });
    }
  );

});
app.delete("/items/:id", (req, res) => {

  const id = req.params.id;

  db.run(
    "DELETE FROM items WHERE id = ?",
    [id],
    function(err){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Task eliminato"
      });
    }
  );

});