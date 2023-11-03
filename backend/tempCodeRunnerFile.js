
// app.post('/getUsers', async (req, res) => {
//     try {
//       const userRecords = await admin.auth().listUsers();
//       const users = userRecords.users.map((userRecord) => ({
//         uid: userRecord.uid,
//         email: userRecord.email,
//         displayName: userRecord.displayName,
//       }));
//       res.json({ success: true, users });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       res.status(500).json({ success: false, error: 'Error fetching user data' });
//     }
//   });