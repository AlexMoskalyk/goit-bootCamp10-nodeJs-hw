const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contatcts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);

      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        console.log(`There is no  user with searched ${id} `);
        return;
      }

      console.log("There is our contact");
      console.table(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("The new contact has been added");
      console.table(newContact);

      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (!removedContact) {
        console.log("no such contact to delete");
        return;
      }
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
