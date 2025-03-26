import express from "express";

const app = express();
const PORT = 3000;

// Set static folder
app.use(express.static("public"));

// Parse URL-encoded & JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle GET request for profile edit
app.get("/user/:id/edit", (req, res) => {
  // Send an HTML form for editing
  res.send(`
    <form hx-put="/user/${req.params.id}" hx-target="this" hx-swap="outerHTML">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" value="Greg Lim">             
        </div>
        <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>     
            <textarea class="form-control" id="bio" name="bio">Follower of Christ | 
Author of Best-selling Amazon Tech Books and Creator of Coding Courses</textarea>     
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>


         <button type="submit" hx-get="/index.html"
 class="btn btn-secondary">
 Cancel
 </button>      
    </form>             
  `);
});

// Handle PUT request for updating profile
app.put("/user/:id", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;

  // Send the updated profile back
  res.send(`
    <div class="card" style="width: 18rem;" hx-target="this" hx-swap="outerHTML">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${bio}</p>
            <button class="btn btn-primary" hx-get="/user/${req.params.id}/edit">
                Click To Edit
            </button>
        </div>
    </div> 
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});