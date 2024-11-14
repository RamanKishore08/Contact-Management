import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: '#fff',
  transition: 'transform 0.2s, background-color 0.3s',
  '&:hover': {
    backgroundColor: '#1565c0',
    transform: 'scale(1.05)',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    transition: 'border-color 0.2s',
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1565c0',
  },
});

export function ContactForm({ onAddContact, onUpdateContact, contactToEdit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        firstName: contactToEdit.firstName,
        lastName: contactToEdit.lastName,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        company: contactToEdit.company,
        jobTitle: contactToEdit.jobTitle
      });
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactToEdit) {
      console.log('Updating contact:', formData); 
      onUpdateContact(formData, contactToEdit._id);
    } else {
      console.log('Adding new contact:', formData);
      onAddContact(formData); 
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: ''
    });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px' }}>
     <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>
            Contact Management System
          </h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StyledTextField
            name="firstName"
            label="First Name"
            fullWidth
            onChange={handleChange}
            value={formData.firstName}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            name="lastName"
            label="Last Name"
            fullWidth
            onChange={handleChange}
            value={formData.lastName}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            name="email"
            label="Email"
            fullWidth
            onChange={handleChange}
            value={formData.email}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            name="phone"
            label="Phone"
            fullWidth
            onChange={handleChange}
            value={formData.phone}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            name="company"
            label="Company"
            fullWidth
            onChange={handleChange}
            value={formData.company}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            name="jobTitle"
            label="Job Title"
            fullWidth
            onChange={handleChange}
            value={formData.jobTitle}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledButton type="submit" fullWidth>
            {contactToEdit ? 'Update Contact' : 'Add Contact'}
          </StyledButton>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {contactToEdit ? 'Contact updated successfully!' : 'Contact added successfully!'}
        </Alert>
      </Snackbar>
    </form>
  );
}
