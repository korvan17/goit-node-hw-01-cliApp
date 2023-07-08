import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

//Розкоментуй і запиши значення
const contactsPath = path.resolve("db", "contacts.json");

// get all contacts from db
export async function listContacts() {
  const listOfContacts = await fs.readFile(contactsPath);
  return JSON.parse(listOfContacts);
}

export async function getContactById(contactId) {
  const listOfContacts = await listContacts();
  const contact = listOfContacts.find((item) => item.id === contactId);
  return contact;
}

export async function addContact({ name, email, phone }) {
  const listOfContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  listOfContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
  return newContact;
}

export async function removeContact(contactId) {
  const listOfContacts = await listContacts();
  const indexOf = listOfContacts.findIndex((item) => item.id === contactId);
  if (indexOf === -1) {
    return null;
  }
  const [result] = listOfContacts.splice(indexOf, 1);
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
  return result;
}
