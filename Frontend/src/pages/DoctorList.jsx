import { useState, useEffect } from 'react';
import API from '../services/api';
import BookAppointment from './BookAppointment';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchDoctors = async (query = '') => {
    try {
      const { data } = await API.get(`/doctors/all?specialization=${query}`);
      setDoctors(data);
    } catch (err) {
      alert('Doctors load karne me error aaya');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchDoctors(e.target.value);
  };

  const getInitials = (name = '') =>
    name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div>
      <div className="hero">
        <svg className="hero-deco" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-10 120 L70 120 L92 58 L120 175 L150 20 L172 120 L410 120"
            stroke="#8EA0FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
          <circle cx="335" cy="55" r="4.5" fill="#8EA0FF" opacity="0.9" />
          <circle cx="372" cy="150" r="3.5" fill="#8EA0FF" opacity="0.7" />
          <circle cx="35" cy="175" r="3.5" fill="#8EA0FF" opacity="0.7" />
          <circle cx="230" cy="45" r="3" fill="#8EA0FF" opacity="0.6" />
        </svg>
        <h1>Find available doctors</h1>
        <p className="hero-sub">
          Search by specialization, compare fees and experience, and book a slot with a verified doctor in under a minute.
        </p>
      </div>

      <div className="search-card-wrap">
        <input
          type="text"
          className="search-input"
          placeholder="Search by specialization (e.g., Dentist, Cardiologist)..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="page" style={{ paddingTop: 32 }}>
        {doctors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="empty-title">No doctors found</p>
            <p className="empty-hint">Try a different specialization, or check back once doctors are added.</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doc) => (
              <div key={doc._id} className="doctor-card">
                <div className="doc-top">
                  <div className="doctor-avatar">{getInitials(doc.user?.name)}</div>
                  <div>
                    <h3>Dr. {doc.user?.name}</h3>
                    <span className="specialization-tag">{doc.specialization}</span>
                  </div>
                </div>
                <div className="doc-meta">
                  <span><strong>{doc.experienceYears}</strong> yrs exp</span>
                  <span><strong>₹{doc.fees}</strong> fee</span>
                </div>
                <button className="book-btn" onClick={() => setSelectedDoctor(doc)}>
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedDoctor && (
        <BookAppointment doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </div>
  );
};

export default DoctorList;
