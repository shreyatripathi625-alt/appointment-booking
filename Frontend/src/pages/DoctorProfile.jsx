import { useState } from 'react';
import API from '../services/api';

const PRESET_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const DoctorProfile = () => {
  const [form, setForm] = useState({
    specialization: '',
    experienceYears: '',
    fees: '',
    about: '',
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [saved, setSaved] = useState(false);

  const toggleSlot = (slot) => {
    setTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaved(false);
    try {
      const token = localStorage.getItem('token');
      await API.post(
        '/doctors/profile',
        {
          specialization: form.specialization,
          experienceYears: Number(form.experienceYears),
          fees: Number(form.fees),
          about: form.about,
          timeSlots,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(true);
      alert('Profile saved successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Could not save profile');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Your doctor profile</h2>
        <p>Patients will see this information when they search for doctors.</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="field">
          <label>Specialization</label>
          <input
            type="text"
            placeholder="e.g. Cardiologist, Dentist"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            required
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Experience (years)</label>
            <input
              type="number"
              min="0"
              value={form.experienceYears}
              onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>Consultation fee (₹)</label>
            <input
              type="number"
              min="0"
              value={form.fees}
              onChange={(e) => setForm({ ...form, fees: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="field">
          <label>About you (optional)</label>
          <textarea
            rows={3}
            placeholder="A short note patients will see on your profile"
            value={form.about}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Available time slots</label>
          <div className="slots-wrap">
            {PRESET_SLOTS.map((slot) => (
              <button
                type="button"
                key={slot}
                className={timeSlots.includes(slot) ? 'slot-chip active' : 'slot-chip'}
                onClick={() => toggleSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-submit">Save profile</button>
        {saved && <p className="save-confirm">Saved — patients can now find you in the doctors list.</p>}
      </form>
    </div>
  );
};

export default DoctorProfile;
