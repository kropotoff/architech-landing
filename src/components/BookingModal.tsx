import { useMemo, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'; 

type Props = { open: boolean; onClose: () => void };

const BookingModal = ({ open, onClose }: Props) => {
  const [eventVenue, setEventVenue] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const isValid = useMemo(() => {
    const emailOk = /^\S+@\S+\.\S+$/.test(email);
    const requiredFilled = [eventVenue, date, location, capacity, duration, time].every(v => v.trim().length > 0);
    const phoneOk = phone.length > 0;
    return requiredFilled && emailOk && phoneOk;
  }, [eventVenue, date, location, capacity, duration, time, email, phone]);

  const handleSubmit = () => {
    const lines = [
      `Event/Venue: ${eventVenue}`,
      `Date: ${date}`,
      `Location: ${location}`,
      `Capacity: ${capacity}`,
      `Set Duration: ${duration}`,
      `Set Time: ${time}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      `Notes: ${notes}`,
    ].join('\n');
    const message = encodeURIComponent(lines);
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Booking Form</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Name of the Event/Venue" value={eventVenue} onChange={(e) => setEventVenue(e.target.value)} required />
          <TextField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
          <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} multiline minRows={3} required />
          <TextField label="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
          <TextField
            label="Set Duration (hours)"
            select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
            {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((d) => (
              <MenuItem key={d} value={String(d)}>{d}</MenuItem>
            ))}
          </TextField>
          <TextField label="Set Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} InputLabelProps={{ shrink: true }} required />
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Box>
            <PhoneInput
              international
              defaultCountry="PT"
              value={phone}
              onChange={(value) => setPhone(value ?? '')}
              placeholder="Phone number"
              style={{
                fontSize: '1rem',
                borderRadius: 4,
                border: '1px solid #c4c4c4',
                background: '#fff',
                width: '100%',
                boxSizing: 'border-box',
                padding: '14px 14px',
                marginTop: 8,
                marginBottom: 8,
              }}
            />
          </Box>
          <TextField label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} multiline minRows={4} placeholder="Anything else we should know?" />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
            <Button
              onClick={onClose}
              variant="text"
              sx={{
                color: '#888',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  color: '#ffb347',
                  background: 'none',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!isValid}
              onClick={handleSubmit}
              sx={{
                background: isValid ? 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)' : '##D3D3D3',
                color: isValid ? '#222' : '##D3D3D3',
                opacity: isValid ? 1 : 0.7,
                boxShadow: isValid ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                border: isValid ? 'none' : '1px solid #444',
                fontWeight: 700,
                textTransform: 'none',
                transition: 'background 0.3s, color 0.3s, opacity 0.3s',
                '&:hover': {
                  background: isValid ? 'linear-gradient(90deg, #ffcc33 0%, #ffb347 100%)' : '#222',
                  color: isValid ? '#222' : '#888',
                  cursor: isValid ? 'pointer' : 'not-allowed',
                },
                backgroundImage: 'none',
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;


