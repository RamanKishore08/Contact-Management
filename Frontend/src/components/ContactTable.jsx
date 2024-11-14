import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditContactModal } from './EditContactModal'; 

export function ContactTable({ contacts, onUpdateContact, onDeleteContact }) {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setEditModalOpen(true);
  };

  const handleEditSave = (id, updatedData) => {
    console.log('Saving updated contact:', id, updatedData); 
    onUpdateContact(id, updatedData);
    setEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick(contact)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDeleteContact(contact._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedContact && (
        <EditContactModal
          open={isEditModalOpen}
          contact={selectedContact}
          onClose={handleCloseModal}
          onSave={handleEditSave}
        />
      )}
    </>
  );
}
