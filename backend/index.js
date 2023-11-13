const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

// firebase config
const admin = require('firebase-admin');
const serviceAccount = require('./vue-proj-a5b1d-firebase-adminsdk-qa3m5-6c2444d039.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send(`App listening on port ${port}`)
})

app.get('/showUsers', async (req, res) => {
    try {
      const userRecords = await admin.auth().listUsers();
      const users = userRecords.users.map((userRecord) => ({
        uid: userRecord.uid,
        email: userRecord.email,
      }));
      res.json({ success: true, users });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ success: false, error: 'Error fetching user data' });
    }
});

app.get('/user/:uid', async (req, res) => {
  const uid = req.params.uid; 

  try {
      const userRecord = await admin.auth().getUser(uid);
      res.json({ success: true, user: userRecord });
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ success: false, error: 'Error fetching user data' });
  }
});

app.post('/addUser', async (req, res) => {
    try {
      const userData = req.body; 
      const userRecord = await admin.auth().createUser(userData);
        res.json({ success: true, user: userRecord });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ success: false, error: 'Error adding user' });
    }
  });
  
  app.put('/updateUser/:uid', async (req, res) => {
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
        // Если ни одно поле не передано для обновления, возвращаем ошибку
        res.status(400).json({ success: false, error: 'No update data provided' });
        return;
      }
  
      const userRecord = await admin.auth().updateUser(uid, updateData);
  
      res.json({ success: true, user: userRecord });
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ success: false, error: 'Error updating user data' });
    }
  });
  