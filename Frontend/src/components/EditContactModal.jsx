import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

export function EditContactModal({ open, contact, onClose, onSave }) {
  const [formData, setFormData] = useState(contact);

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Saving updated contact:', formData); 
    if (contact) {
      onSave(contact._id, formData); 
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          value={formData.firstName || ''}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          value={formData.lastName || ''}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          value={formData.email || ''}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Phone"
          fullWidth
          value={formData.phone || ''}
          onChange={handleChange}
        />
        <TextField
          name="company"
          label="Company"
          fullWidth
          value={formData.company || ''}
          onChange={handleChange}
        />
        <TextField
          name="jobTitle"
          label="Job Title"
          fullWidth
          value={formData.jobTitle || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
