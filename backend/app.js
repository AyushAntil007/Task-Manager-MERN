const express =  require('express')
const app = express();
const cors = require('cors');

// CORS = Cross-Origin Resource Sharing

// It allows your backend to accept requests from a different origin (domain/port).

app.use(express.json());
app.use(cors());


app.get('/', (req,res) => {
  res.send("api running");
});

app.listen(5000 , ()=> {
  console.log("server running on port 5000")
})