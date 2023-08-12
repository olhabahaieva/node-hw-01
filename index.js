// console.log('Welcome to Node.js');
const Contacts = require("./contacts.js");

// contacts.listContacts().then(console.log).catch(console.error); //worls
// contacts.getContactById("AeHIrLTr6JkxGE6SN-0Rw").then(console.log).catch(console.error); //works
// contacts.removeContact("AeHIrLTr6JkxGE6SN-0Rw").then(console.log).catch(console.error); //works
// contacts.addContact("love", "love", "love").then(console.log).catch(console.error); //works


const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await Contacts.listContacts();
      console.table(contacts);
      return contacts;

    case 'get':
      const bookId = await Contacts.getContactById(id);
      console.table(bookId);
      return bookId;

    case 'add':
      const newBook = await Contacts.addContact({name, email, phone});
      console.table(newBook);
      return newBook;

    case 'remove':
     const removeBook = await Contacts.removeContact(id);
     console.table(removeBook);
     return removeBook;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
