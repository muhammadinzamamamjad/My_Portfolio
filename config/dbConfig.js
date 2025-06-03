const mongoose= require('mongoose');
mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

module.exports = connection; 
  