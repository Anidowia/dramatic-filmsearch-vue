const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const { collection, getDocs } = require("firebase/firestore");
const app = express();

const args = process.argv.slice(2);
const [name, email, message] = args;

app.use(express.json());
app.use(cors());
const port = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// firebase config
const admin = require("firebase-admin");
const serviceAccount = require("./vue-proj-a5b1d-firebase-adminsdk-qa3m5-6c2444d039.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

server.listen(3001, () => {
  console.log(`WebSocket server is listening on port 3001`);
});

wss.on("connection", (socket) => {
  console.log("WebSocket connection established");

  socket.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    const data = JSON.parse(message);
    console.log("Received data from server:", data);
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ name, email, message }));
    }
  });

  socket.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Route for the root path
app.get("/", (req, res) => {
  res.send(`App listening on port ${port}`);
});

// Route for listing all users
app.route("/showUsers").get(async (req, res) => {
  try {
    const userRecords = await admin.auth().listUsers();
    const users = userRecords.users.map((userRecord) => ({
      uid: userRecord.uid,
      email: userRecord.email,
    }));
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, error: "Error fetching user data" });
  }
});

app.route("/showMessages").get(async (req, res) => {
  try {
    const chatboxCollection = db.collection("chatbox");
    const chatboxSnapshot = await chatboxCollection.get();

    const chatboxData = [];
    chatboxSnapshot.forEach((doc) => {
      const data = doc.data();
      chatboxData.push({
        id: doc.id,
        name: data.name,
        email: data.email,
        message: data.message,
      });
    });

    res.json({ success: true, chatboxData });
  } catch (error) {
    console.error("Error fetching chatbox data:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching chatbox data" });
  }
});

// Route for getting a user by UID
app.route("/user/:uid").get(async (req, res) => {
  const uid = req.params.uid;

  try {
    const userRecord = await admin.auth().getUser(uid);
    res.json({ success: true, user: userRecord });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, error: "Error fetching user data" });
  }
});

app.route("/getMessage/:id").get(async (req, res) => {
  const messageId = req.params.id; 

  try {
    const chatboxDoc = await db.collection("chatbox").doc(messageId).get();

    if (!chatboxDoc.exists) {
      return res
        .status(404)
        .json({ success: false, error: "Message not found" });
    }

    const data = chatboxDoc.data();
    const messageData = {
      id: chatboxDoc.id,
      name: data.name,
      email: data.email,
      message: data.message,
    };

    res.json({ success: true, messageData });
  } catch (error) {
    console.error("Error fetching message data:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching message data" });
  }
});

// Route for adding a new user
app.route("/addUser").post(async (req, res) => {
  try {
    const userData = req.body;
    const userRecord = await admin.auth().createUser(userData);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("User registered successfully!");
      }
    });
    res.json({ success: true, user: userRecord });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ success: false, error: "Error adding user" });
  }
});

app.route("/addMessage").post(async (req, res) => {
  try {
    const messageData = req.body;

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("New message: " + messageData.text);
      }
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ success: false, error: "Error adding message" });
  }
});

// Route for updating a user by UID
app.route("/updateUser/:uid").put(async (req, res) => {
  const uid = req.params.uid;
  const { email, password } = req.query;

  try {
    const updateData = {};

    if (email) {
      updateData.email = email;
    }

    if (password) {
      updateData.password = password;
    }

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No update data provided" });
    }

    const userRecord = await admin.auth().updateUser(uid, updateData);

    // Send a message to the client via WebSocket
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("User data changed successfully!");
      }
    });

    return res.json({ success: true, user: userRecord });
  } catch (error) {
    console.error("Error updating user data:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error updating user data" });
  }
});
