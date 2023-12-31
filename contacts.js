const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const data = await listContacts();
  
  const dataId = data.find((contact) => contact.id === contactId);
  if (!dataId) {
    return null;
  }
   return dataId;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContacts = [...data.slice(0, index), ...data.slice(index + 1)];
  await writeContacts(newContacts);

  return data[index];
}

async function addContact({name, email, phone}) {
  const data = await listContacts();
  const newContact = {
    id: crypto.randomUUID(), 
    name,
    email,
    phone,
  };

  const newContacts = [...data, newContact];
  await writeContacts(newContacts);

  return newContact;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
