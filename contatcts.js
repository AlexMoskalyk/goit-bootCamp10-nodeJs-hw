const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname + "/db/contacts.json");
// const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === Number(contactId));
    return console.log(contact);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updateList = contacts.filter((item) => item.id !== Number(contactId));

    await fs.writeFile(contactsPath, JSON.stringify(updateList));
    return updateList;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContat = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContat);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContat;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
