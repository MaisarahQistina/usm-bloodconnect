import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';
import Button from './Button';

const Hero = ({user}) => {
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { donorID } = location.state || {};  
  console.log("Donor ID from location:", donorID);

  const handleBookNow = () => {
    if (user?.role === 'donor') {
      navigate('/questionnaire-start-page',{ state: { donorID: donorID, eventId: event.eventID } }); // Redirect to sign-in page if not signed in
    } else {
      navigate('/sign-in'); // Proceed to booking if signed in
    }
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
        const response = await fetch("http://localhost:8081/"); // Match your backend endpoint
        const data = await response.json();

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
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
      {event ? (
        <>
          <h2 className={styles.title}>{event.eventName}</h2>
          <p className={styles.details}>
            Date: {formatDateOnly(event.eventDate)}<br />
            Time: {formatTimeOnly(event.startTime)} - {formatTimeOnly(event.endTime)} <br />
            Venue: {event.eventLocation}
          </p>
          <div className={styles.actionArea}>
            <Button text="Book Now!" variant="cta" onClick={handleBookNow} />
          </div>
        </>
      ) : (
        <p>Loading event details...</p>
      )}
      </div>
    </section>
  );
};

export default Hero;