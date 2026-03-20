const express =  require('express')
const app = express();
const cors = require('cors');
// CORS = Cross-Origin Resource Sharing

const authRoutes = require('./routes/authRoutes');

const taskRoutes = require('./routes/taskRoutes')

// It allows your backend to accept requests from a different origin (domain/port).

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
//“Use all routes inside authRoutes with a base path /api/auth”


app.get('/', (req,res) => {
  res.send("api running");
});

app.listen(5000 , ()=> {
  console.log("server running on port 5000")
})