import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://meghrajparashar_db_user:meghraj@cluster0.hokwvja.mongodb.net/testdb?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });