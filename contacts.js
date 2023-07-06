// contacts.js

import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";

const contactsPath = "./db/contacts.json";

/**
 * Функція з обробкою помилок
 * @param {Function} func - Асинхронна функція, яку потрібно виконати
 * @returns {Promise} Об'єкт Promise, який містить результат виконання або null у разі помилки
 */
async function withErrorHandling(func) {
    try {
        return await func;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

/**
 * Повертає список контактів.
 *
 * @returns {Promise<Array>} Массив контактов.
 */
async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
}

/**
 * Повертає контакт за вказаним ідентифікатором.
 *
 * @param {string} contactId - Ідентифікатор контакту.
 * @returns {Promise<Object|null>}  Об'єкт контакту або null, якщо контакт не знайдено.
 */
async function getContactById(contactId) {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
}

/**
 * Видаляє контакт за вказаним ідентифікатором.
 *
 * @param {string} contactId - Ідентифікатор контакту.
 * @returns {Promise<Object|null>} Об'єкт віддаленого контакту або null, якщо контакт не знайдено.
 */
async function removeContact(contactId) {
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
}

/**
 * Додає новий контакт.
 *
 * @param {string} name - Ім'я контакту.
 * @param {string} email - Email контакту.
 * @param {string} phone - Телефон контакту.
 * @returns {Promise<Object>} Об'єкт доданого контакту.
 */
async function addContact(name, email, phone) {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
        id: uuid(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}

export const ListContacts = await withErrorHandling(listContacts);
export const GetContactById = await withErrorHandling(getContactById);
export const RemoveContact = await withErrorHandling(removeContact);
export const AddContact = await withErrorHandling(addContact);
