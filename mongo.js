const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.zdfxz1r.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose.connect(url).then((result) => {
    console.log("phonebook:");
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  });
} else if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      console.log(`added ${person.name} number ${person.number} to phonebook`);
      return person.save();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
