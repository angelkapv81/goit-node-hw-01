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

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts
        .listContacts()
        .then((contacts) => {
          console.table(contacts);
        })
        .catch((error) => {
          console.error(error);
        });
      break;

    case "get":
      contacts
        .getContactById(id)
        .then((contact) => {
          console.table(contact);
        })
        .catch((error) => {
          console.error(error);
        });
      break;

    case "add":
      contacts
        .addContact(name, email, phone)
        .then((contact) => {
          console.table(contact);
        })
        .catch((error) => {
          console.error(error);
        });
      break;

    case "remove":
      contacts
        .removeContact(id)
        .then((contact) => {
          console.table(contact);
        })
        .catch((error) => {
          console.error(error);
        });
      break;

    default:
      console.warn("Unknown action type!".brightRed);
  }
}

invokeAction(argv);
