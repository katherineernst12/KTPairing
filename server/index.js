const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

// Creates a user's login (sign up)
app.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;  // Destructure email and password from request body

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds set to 10
    console.log("Hashed Password:", hashedPassword);  // Log the hashed password for debugging

    // Insert both email and hashed password into the userLogIn table
    const newUser = await pool.query(
      "INSERT INTO userLogIn (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    res.json(newUser.rows[0]);  // Return the new user data (e.g., email, id, etc.)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Log in post method
app.post("/logIn/authenticate", async (req, res) => {
    try {
      const { email, password } = req.body; // Get both email and password from the body
  
      const result = await pool.query(
        "SELECT password FROM userLogIn WHERE email = $1",
        [email]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }
  
      const storedPassword = result.rows[0].password;
      console.log("Stored Password:", storedPassword);
  
      const isMatch = await bcrypt.compare(password, storedPassword);
      console.log("Password Match:", isMatch);
  
      if (isMatch) {
        return res.status(200).json({
          status: "success",
          message: "Login successful",
          email: email,
        });
      } else {
        return res.status(401).json({
          status: "error",
          message: "Incorrect password",
        });
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  });

// POST route for creating an event
app.post("/createEvent", async (req, res) => {
  try {
    const { eventName, eventDes, dateOfEvent, eventPassword } = req.body;

    if (!eventName || !eventDes || !dateOfEvent || !eventPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
      INSERT INTO events (eventName, eventDes, dateOfEvent, eventPassword)
      VALUES ($1, $2, $3, $4)
      RETURNING event_id;
    `;
    
    const result = await pool.query(query, [eventName, eventDes, dateOfEvent, eventPassword]);

    const eventId = result.rows[0].event_id;

    res.status(201).json({ message: "Event created successfully", eventId });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});