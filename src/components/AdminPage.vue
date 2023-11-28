<template>
  <header>
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse">
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          <ul class="list-group bg-transparent">
            <li class="list-group-item bg-transparent">Cras justo odio</li>
            <li class="list-group-item bg-transparent">
              Dapibus ac facilisis in
            </li>
            <li class="list-group-item bg-transparent">Morbi leo risus</li>
            <li class="list-group-item bg-transparent">
              Porta ac consectetur ac
            </li>
            <li class="list-group-item bg-transparent">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    </nav>
    <nav
      id="main-navbar"
      class="navbar navbar-expand-lg navbar-light fixed-top"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <a class="navbar-brand" href="#">
          <img
            src="../assets/dramatic.png"
            height="25"
            alt="MDB Logo"
            loading="lazy"
          />
          <h4 style="color: #ffc907">ADMIN</h4>
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-emoji-sunglasses-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.22 4.22 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A2.99 2.99 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515zM4.969 9.75A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .866-.5z"
          />
        </svg>
        <router-link to="/" class="btn btn-outline"> LOGOUT </router-link>
      </div>
    </nav>
  </header>
  <main style="margin-top: 58px">
    <div class="container pt-4">
      <button @click="fetchUsers" class="btn btn-primary">Fetch Users</button>
      <h2>Users</h2>
      <table style="width: 100%; font-size: 18px" border="">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.uid">
            <td>{{ user.uid }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <button @click="fetchMessages" class="btn btn-primary">
        Fetch Messages
      </button>
      <h2>Messages:</h2>
      <table style="width: 100%; font-size: 18px" border="">
        <thead>
          <tr>
            <th>Message ID</th>
            <th>User Name</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="message in messages" :key="message.id">
            <td>{{ message.id }}</td>
            <td>{{ message.name }}</td>
            <td>{{ message.email }}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <!-- Fetch Users -->
      <div>
        <label style="font-size: 18px" for="userId">User ID:</label>
        <input v-model="userId" type="text" id="userId" />
        <button @click="fetchUser" class="btn btn-primary">Fetch User</button>
      </div>
      <h2>Users Data:</h2>

      <div v-if="user">
        <h5>User ID: {{ user.uid }}</h5>
        <h5>User Email: {{ user.email }}</h5>
      </div>
      <br />

      <!-- Fetch Messages -->
      <div>
        <label for="messageId" style="font-size: 18px">Message ID:</label>
        <input v-model="messageId" type="text" id="messageId" />
        <button @click="fetchMessage" class="btn btn-primary">
          Fetch Message
        </button>
      </div>
      <br />
      <h2>Messages Data:</h2>
      <div v-if="message">
        <h5>Message ID: {{ message.id }}</h5>
        <h5>User Name: {{ message.name }}</h5>
        <h5>User Email: {{ message.email }}</h5>
        <h5>Message: {{ message.text }}</h5>
      </div>

      <div>
        <h2>User Update</h2>
        <label for="updateUserId" style="font-size: 18px">User ID:</label>
        <input v-model="updateUserId" type="text" id="updateUserId" />
        <label for="updateUserEmail" style="font-size: 18px">New Email:</label>
        <input v-model="updateUserEmail" type="text" id="updateUserEmail" />
        <label for="updateUserPassword" style="font-size: 18px"
          >New Password:</label
        >
        <input
          v-model="updateUserPassword"
          type="password"
          id="updateUserPassword"
        />
        <button @click="updateUser" class="btn btn-primary">Update User</button>
      </div>

      <div>
        <h2>User Addition</h2>
        <label for="newUserEmail" style="font-size: 18px">Email:</label>
        <input v-model="newUserEmail" type="text" id="newUserEmail" />
        <label for="newUserPassword" style="font-size: 18px">Password:</label>
        <input v-model="newUserPassword" type="password" id="newUserPassword" />
        <button @click="addUser" class="btn btn-primary">Add User</button>
      </div>
      <div>
        <h2>Chatbox Addition</h2>
        <label for="newUserEmail" style="font-size: 18px">Email:</label>
        <input v-model="UserEmail" type="text" id="newUserEmail" />

        <label for="newUserName" style="font-size: 18px">Name:</label>
        <input v-model="UserName" type="text" id="newUserName" />

        <label for="newUserMessage" style="font-size: 18px">Message:</label>
        <input v-model="UserMessage" type="text" id="newUserMessage" />

        <button @click="addMessage" class="btn btn-primary">Add Message</button>
      </div>
      <div>
        <p>Name: {{ receivedMessage.name }}</p>
        <p>Email: {{ receivedMessage.email }}</p>
        <p>Message: {{ receivedMessage.text }}</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      messages: [],
      userId: "",
      messageId: "",
      user: null,
      text: null,
      message: null,
      newUserEmail: "",
      newUserPassword: "",
      newMessageText: "",
      UserEmail: "",
      UserName: "",
      UserMessage: "",
      name: "",
      email: "",
      socket: null,
      receivedMessage: {
        name: "",
        email: "",
        text: "",
      },
    };
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.addEventListener("message", (event) => {
      const data = event.data;
      try {
        this.updateFormFromConsole(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/showUsers");
        const data = await response.json();
        this.users = data.users;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async fetchMessages() {
      try {
        const response = await fetch("http://localhost:3000/showMessages");
        const data = await response.json();
        this.messages = data.chatboxData;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${this.userId}`
        );
        const data = await response.json();
        this.user = data.user;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },

    async fetchMessage() {
      try {
        const response = await fetch(
          `http://localhost:3000/getMessage/${this.messageId}`
        );
        const data = await response.json();

        if (data.success) {
          this.message = data.messageData;
        } else {
          console.error("Message not found");
        }
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    },
    async updateUser() {
      try {
        const response = await fetch(
          `http://localhost:3000/updateUser/${this.updateUserId}?email=${this.updateUserEmail}&password=${this.updateUserPassword}`,
          { method: "PUT" }
        );
        const data = await response.json();

        if (data.success) {
          alert("User updated successfully");
        } else {
          console.error("Error updating user:", data.error);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async addUser() {
      try {
        const response = await fetch(
          `http://localhost:3000/addUser?email=${this.newUserEmail}&password=${this.newUserPassword}`,
          { method: "POST" }
        );
        const data = await response.json();

        if (data.success) {
          alert("User added successfully");
        } else {
          console.error("Error adding user:", data.error);
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    addMessage() {
      const messageData = {
        text: this.UserMessage,
        name: this.UserName,
        email: this.UserEmail,
      };
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(messageData));
        console.log("Sent data:", messageData);
      } else {
        console.error("WebSocket connection not open.");
      }
      this.messages.push({
        text: this.UserMessage,
        name: this.UserName,
        email: this.UserEmail,
      });

      this.UserName = "";
      this.UserEmail = "";
      this.UserMessage = "";
    },
    async updateFormFromConsole(data) {
      try {
        if (data instanceof Blob) {
          const textData = await data.text();
          const jsonData = JSON.parse(textData);
          this.receivedMessage.name = jsonData.name || "";
          this.receivedMessage.email = jsonData.email || "";
          this.receivedMessage.text = jsonData.text || "";
        } else if (typeof data === "string") {
          const jsonData = JSON.parse(data);
          this.receivedMessage.name = jsonData.name || "";
          this.receivedMessage.email = jsonData.email || "";
          this.receivedMessage.text = jsonData.text || "";
        } else {
          console.error("Unsupported data type:", data);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    },
  },
};
</script>

<style>
button,
input {
  overflow: visible;
  margin: 10px;
}
.pt-4,
.py-4 {
  padding-top: 2.5rem !important;
  margin-left: 0.5rem;
}
svg:not(:root) {
  overflow: hidden;
  margin-left: 1420px;
}
.btn-outline {
  width: 99px;
  color: #000 !important;
  background-color: #ffc907 !important;
  font-weight: bold;
  border-radius: 18.5px !important;
  text-align: center !important;
}
.list-group-flush .list-group-item {
  font-size: 18px;
}

.bg-ffc39e {
  background-color: #ffc39e;
}

@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}
.fixed-top {
  background: #392c5b;
}
.sidebar {
  background: #392c5b;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 60px 0 0;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 240px;
  z-index: 600;
}

@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
  }
}
.sidebar .active {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
