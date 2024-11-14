import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContactForm } from './components/ContactForm';
import { ContactTable } from './components/ContactTable';

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const response = await axios.get('http://localhost:5000/contacts');//Replace with your MongoDB_API
    setContacts(response.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (contact) => {
    await axios.post('http://localhost:5000/contacts', contact);//Replace with your MongoDB_API
    fetchContacts();
  };

  const updateContact = async (id, updatedContact) => {
    try {
      console.log('Updating contact:', id, updatedContact); 
      await axios.put(`http://localhost:5000/contacts/${id}`, updatedContact);//Replace with your MongoDB_API
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error); // Error handling
    }
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/contacts/${id}`);//Replace with your MongoDB_API
    fetchContacts();
  };

  return (
    <div>
      <ContactForm onAddContact={addContact} />
      <ContactTable
        contacts={contacts}
        onUpdateContact={updateContact}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
