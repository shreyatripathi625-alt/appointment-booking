import { useState } from 'react';
import API from '../services/api';

const BookAppointment = ({ doctor, onClose }) => {
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Default slots agar doctor profile me specify na ho
  const slots = doctor?.timeSlots?.length > 0
    ? doctor.timeSlots
    : ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return alert('Please select a time slot!');

    try {
      await API.post('/appointments/book', {
        doctorId: doctor.user?._id || doctor.user,
        date,
        timeSlot: selectedSlot
      });
      alert('Appointment booked successfully!');
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Book Appointment</h3>
        <p className="modal-sub">Dr. {doctor?.user?.name}</p>
        <span className="fee-badge">₹{doctor?.fees} consultation</span>

        <form onSubmit={handleBooking}>
          <label>Select date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Select time slot</label>
          <div className="slots-wrap">
            {slots.map((slot) => (
              <button
                type="button"
                key={slot}
                className={selectedSlot === slot ? 'slot-chip active' : 'slot-chip'}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-confirm">
              Confirm booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
