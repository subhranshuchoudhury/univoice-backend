const mongoose = require('mongoose');
function DbConnect() {
    console.log('coming here...', "mongodb://Chintu:chintu1234@cluster1.i5s6j2d.mongodb.net/codershouse");
    const DB_URL = "mongodb+srv://Chintu:chintu1234@cluster1.i5s6j2d.mongodb.net/?retryWrites=true&w=majority";
    // Database connection
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('DB connected...');
    });
}

module.exports = DbConnect;
