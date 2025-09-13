const express = require("express");
const connectDB = require("./connection/mongoose");
const cors = require("cors");
const logger = require("./utils/logger");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:3000', 
  'https://stmd-e-vargani.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS policy blocked this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); 

const TabRoutes = require("./routes/tabs");
const EntryRoutes = require("./routes/entries");
const AdminRoutes = require("./routes/admin") 

app.use("/api/tabs", TabRoutes);
app.use("/api/entries", EntryRoutes);
app.use('/api/admin', AdminRoutes); 

app.get('/api/config', (req, res) => {
  res.json(config);
});

const connection = async () => {
  await connectDB();
  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => {
    logger.success(`Server running on Port ${PORT}`);
  });
};

connection();
