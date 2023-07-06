// index.js

import * as contacts from "./contacts.js";
import { Command } from "commander";
import colors from "colors";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const list = await contacts.ListContacts();
        console.table(list);
        break;

      case "get":
        const contact = await contacts.GetContactById(id);
        console.table(contact);
        break;

      case "add":
        const newContact = await contacts.AddContact(name, email, phone);
        console.table(newContact);
        break;

      case "remove":
        const removedContact = await contacts.RemoveContact(id);
        console.table(removedContact);
        break;

      default:
        console.warn("Unknown action type!".brightRed);
    }
  } catch (error) {
    console.error(error);
  }
}

invokeAction(argv);
