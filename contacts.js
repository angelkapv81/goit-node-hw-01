// contacts.js

import { promises as fs } from "fs";
import { v4 as uuids4 } from "uuid";

const contactsPath = "./db/contacts.json";

/**
 * Повертає список контактів.
 *
 * @returns {Promise<Array>} Массив контактов.
 */
export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
}

/**
 * Повертає контакт за вказаним ідентифікатором.
 *
 * @param {string} contactId - Ідентифікатор контакту.
 * @returns {Promise<Object|null>}  Об'єкт контакту або null, якщо контакт не знайдено.
 */
export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Error reading contacts:", error);
    return null;
  }
}

/**
 * Видаляє контакт за вказаним ідентифікатором.
 *
 * @param {string} contactId - Ідентифікатор контакту.
 * @returns {Promise<Object|null>} Об'єкт віддаленого контакту або null, якщо контакт не знайдено.
 */
export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index === -1) {
      // Контакт із зазначеним id не знайдено
      return null;
    }

    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
}

/**
 * Додає новий контакт.
 *
 * @param {string} name - Ім'я контакту.
 * @param {string} email - Email контакту.
 * @param {string} phone - Телефон контакту.
 * @returns {Promise<Object>} Об'єкт доданого контакту.
 */
export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: uuids4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
}
