import { useState, useEffect } from 'react';
import API from '../services/api';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const fetchMyAppointments = async () => {
    try {
      const { data } = await API.get('/appointments/my-appointments');
      setAppointments(data);
    } catch (err) {
      alert('Appointments load karne me error आया');
    }
  };

  return (
    <div className="page">
      <h2 className="dashboard-welcome">Welcome, {user.name}</h2>
      <p className="dashboard-sub">Here's a look at your appointments.</p>

      {appointments.length === 0 ? (
        <div className="empty-state">No appointments booked yet.</div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((item) => (
            <div key={item._id} className="appointment-card">
              <div className="apt-row">
                <span className="label">Doctor/Patient</span>
                <span className="value">{item.doctor?.name || item.patient?.name}</span>
              </div>
              <div className="apt-row">
                <span className="label">Date</span>
                <span className="value">{item.date}</span>
              </div>
              <div className="apt-row">
                <span className="label">Time Slot</span>
                <span className="value">{item.timeSlot}</span>
              </div>
              <div className="apt-row">
                <span className="label">Status</span>
                <span className={`status-badge status-${item.status}`}>
                  {item.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
