import { useMemo, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, MenuItem, Typography } from '@mui/material';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

type Props = { open: boolean; onClose: () => void };

// Shared dark field styling
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.82rem',
    color: '#f0eff5',
    backgroundColor: 'rgba(18, 18, 22, 0.6)',
    borderRadius: '2px',
    '& fieldset': { borderColor: 'rgba(124, 106, 247, 0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(124, 106, 247, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#7c6af7', borderWidth: 1 },
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.78rem',
    color: '#8c8a9a',
    '&.Mui-focused': { color: '#7c6af7' },
  },
  '& .MuiSelect-icon': { color: '#8c8a9a' },
  '& .MuiInputBase-inputMultiline': { color: '#f0eff5' },
  '& input': { color: '#f0eff5' },
  '& input[type="date"]::-webkit-calendar-picker-indicator': { filter: 'invert(0.6)' },
  '& input[type="time"]::-webkit-calendar-picker-indicator': { filter: 'invert(0.6)' },
};

const dropdownMenuProps = {
  PaperProps: {
    sx: {
      background: '#0f0f12',
      border: '1px solid rgba(124, 106, 247, 0.2)',
      borderRadius: '2px',
      '& .MuiMenuItem-root': {
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.82rem',
        color: '#f0eff5',
        '&:hover': { background: 'rgba(124, 106, 247, 0.15)' },
        '&.Mui-selected': { background: 'rgba(124, 106, 247, 0.2)' },
      },
    },
  },
};

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
    return requiredFilled && emailOk && phone.length > 0;
  }, [eventVenue, date, location, capacity, duration, time, email, phone]);

  const handleSubmit = () => {
    const lines = [
      `Event/Venue: ${eventVenue}`,
      `Date: ${date}`,
      `Location: ${location}`,
      `Capacity: ${capacity}`,
      `Set Duration: ${duration}h`,
      `Set Time: ${time}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      `Notes: ${notes}`,
    ].join('\n');
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines)}`, '_blank');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: '#0a0a0c',
          border: '1px solid rgba(124, 106, 247, 0.2)',
          borderRadius: '4px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 0, pt: 3, px: 3 }}>
        <Typography
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            letterSpacing: '0.08em',
            lineHeight: 1,
            color: '#f0eff5',
          }}
        >
          Book ArchiTech
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#4a4855',
            mt: 0.5,
          }}
        >
          Fill in the details and we'll get back to you
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2, pb: 3 }}>
        <Box display="flex" flexDirection="column" gap={1.5} mt={1}>

          <TextField
            label="Event / Venue name"
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
            required
            fullWidth
            sx={fieldSx}
          />

          {/* Date + Time side by side */}
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5}>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              sx={fieldSx}
            />
            <TextField
              label="Set time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              sx={fieldSx}
            />
          </Box>

          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            fullWidth
            sx={fieldSx}
          />

          {/* Capacity + Duration side by side */}
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5}>
            <TextField
              label="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              sx={fieldSx}
            />
            <TextField
              label="Set duration (hrs)"
              select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              sx={fieldSx}
              SelectProps={{ MenuProps: dropdownMenuProps }}
            >
              {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((d) => (
                <MenuItem key={d} value={String(d)}>{d}h</MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={fieldSx}
          />

          {/* Phone input — styled via App.css .booking-phone */}
          <div className="booking-phone">
            <PhoneInput
              international
              defaultCountry="PT"
              value={phone}
              onChange={(value) => setPhone(value ?? '')}
              placeholder="Phone number"
            />
          </div>

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            minRows={3}
            placeholder="Anything else we should know?"
            fullWidth
            sx={{
              ...fieldSx,
              '& .MuiOutlinedInput-root': {
                ...fieldSx['& .MuiOutlinedInput-root'],
                '& textarea': { color: '#f0eff5', fontFamily: "'Space Mono', monospace", fontSize: '0.82rem' },
                '& textarea::placeholder': { color: '#4a4855', opacity: 1 },
              },
            }}
          />

          {/* Actions */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
            <Button
              onClick={onClose}
              sx={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#4a4855',
                '&:hover': { color: '#8c8a9a', background: 'none' },
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!isValid}
              onClick={handleSubmit}
              sx={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderRadius: '2px',
                px: 3,
                py: 1,
                background: isValid ? 'linear-gradient(90deg, #7c6af7 0%, #9d8eff 100%)' : 'transparent',
                color: isValid ? '#f0eff5' : '#4a4855',
                border: isValid ? 'none' : '1px solid rgba(124, 106, 247, 0.15)',
                boxShadow: isValid ? '0 4px 20px rgba(124, 106, 247, 0.35)' : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: isValid ? 'linear-gradient(90deg, #9d8eff 0%, #7c6af7 100%)' : 'transparent',
                  boxShadow: isValid ? '0 4px 28px rgba(124, 106, 247, 0.5)' : 'none',
                },
                '&.Mui-disabled': { color: '#4a4855' },
              }}
            >
              Send Booking
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
