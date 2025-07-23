import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Contact {
  name: string;
  email: string;
}

const CONTACTS_KEY = "user_contacts";

export const getContacts = async (): Promise<Contact[]> => {
  const contactsJSON = await AsyncStorage.getItem(CONTACTS_KEY);
  return contactsJSON ? JSON.parse(contactsJSON) : [];
};

export const saveContact = async (newContact: Contact): Promise<void> => {
  const existingContacts = await getContacts();
  const isDuplicate = existingContacts.some(
    (c) => c.email.toLowerCase() === newContact.email.toLowerCase()
  );
  if (!isDuplicate) {
    const updated = [...existingContacts, newContact];
    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  }
};

export const deleteContact = async (email: string): Promise<void> => {
  const contacts = await getContacts();
  const filtered = contacts.filter(
    (contact) => contact.email.toLowerCase() !== email.toLowerCase()
  );
  await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(filtered));
};
