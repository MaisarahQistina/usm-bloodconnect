import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from './BookAppointment.module.css';
import DoctorCard from './DoctorCard';
import ConfirmationModal from './ConfirmationModal';

const doctors = [
  { name: 'Dr. Syaza Sufia Binti Roselan' },
  { name: 'Dr. Najwa Batrisyia Binti Mohamad' },
  { name: 'Dr. Maisarah Qistina Binti Meor Sha\'azizi' },
  { name: 'Dr. Rajihah Binti Rosydi' },
  { name: 'Dr. Anis Farihah Binti Mohd Fuad' },
  { name: 'Dr. Marsya Diyana Binti Meor Sha\'azizi' }
];

function BookAppointment() {
  const location = useLocation();
  const { eventID } = location.state || {};  // Get eventId from location state
  const { donorID } = location.state || {};
  console.log("Event ID from questionnaire:", eventID);
  console.log("Donor ID from questionnaire:", donorID);

  const [event, setEvent] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track selected doctor
  const [timeslotSelected, setTimeslotSelected] = useState(false); // Track if any time slot is selected
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const handleTimeslotSelection = (doctorName, timeslot) => {
    if (timeslot) {
      setSelectedDoctor(doctorName);
      setTimeslotSelected(true);
    } else {
      setSelectedDoctor(null);
      setTimeslotSelected(false);
    }
  };

  const handleConfirmBooking = () => {
    if (timeslotSelected) {
      setIsModalOpen(true); // Open modal on confirm
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  // Function format date
  function formatDateOnly(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${day} / ${month} / ${year}`;
  }

  // Function format time
  function formatTimeOnly(timeString) {
    return timeString.slice(0, 5); // Take the first 5 characters (HH:mm) from the time string
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8081/eventAppointment/${eventID}`); // Use backticks for string interpolation
        const data = await response.json();

        console.log("Fetched event data:", data); 

        console.log("Fetched event data:", data); // Log the fetched data
        if (data.event) {
          setEvent(data.event); // Set the specific event directly
        } else {
          console.error("Event not found.");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventID]);

  return (
    <div className={styles.bookAppointment}>
      <main className={styles.content}>
        <section className={styles.eventInfo}>
          {event ? (
            <h1 className={styles.eventTitle}>{event.eventName} — Book your appointment now!</h1>
          ) : (
            <h1 className={styles.eventTitle}>Loading event details...</h1>
          )}

          {/* Display event details if available */}
          {event ? (
            <p className={styles.eventDetails}>
              Date: {formatDateOnly(event.eventDate)}<br />
              Time: {formatTimeOnly(event.startTime)} - {formatTimeOnly(event.endTime)} <br />
              Venue: {event.eventLocation}
            </p>
          ) : (
            <p>Loading event details...</p>
          )}
        </section>
        <div className={styles.doctorGrid}>
          {doctors.map((doctor, index) => (
            <DoctorCard 
              key={index} 
              name={doctor.name} 
              isDisabled={timeslotSelected && selectedDoctor !== doctor.name}
              onTimeslotSelect={handleTimeslotSelection}
            />
          ))}
        </div>
      </main>
      <footer className={styles.actions}>
        <button 
          className={`${styles.confirmButton} ${!timeslotSelected ? styles.disabled : ''}`} 
          disabled={!timeslotSelected}
          onClick={handleConfirmBooking}
        >
          Confirm
        </button>
      </footer>

      {/* Render the modal only when isModalOpen is true */}
      {isModalOpen && <ConfirmationModal onClose={closeModal} />}
    </div>
  );
}

export default BookAppointment;
