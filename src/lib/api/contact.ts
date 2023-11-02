import { Contact } from "@/models/contact";
import { client } from "./client";

async function getContacts(): Promise<Contact[]> {
  return await client("api/contacts");
}

async function getContact(id:string): Promise<Contact> {
  return await client(`api/contacts/${id}`);
}

async function addContact(payload: Contact): Promise<Contact> {
  const response:Contact = await client("api/contacts", {
    body: { contact:payload },
  });

  return response;
}

async function updateContact(id: string, payload: Partial<Contact>): Promise<Contact> {
  const response:Contact = await client(`api/contacts/${id}`, {
    body: { info:payload },
    method: "PATCH"
  });

  return response;
}

async function deleteContact(id: string): Promise<Contact> {
  const response:Contact = await client(`api/contacts/${id}`, {
    method: "DELETE"
  });

  return response;
}

export { getContacts, getContact, addContact, updateContact, deleteContact };
