import React from 'react';
import './ParkingDashboard.css';  // can add in the CSS here if needed

const ParkingDashboard = () => {
  return (
    <div>
      <header>
        <h1>Parking Lot Dashboard</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="dashboard">
          <h2>Parking Availability</h2>
          <div className="lot-container">
            <div className="lot" id="lot1">
              <h3>Lot 1</h3>
              <div className="availability">
                <p>Available Spots: <span id="lot1-available">50</span></p>
              </div>
              <button className="alert-button" onClick={() => sendAlert('lot1')}>Send Alert</button>
            </div>
            <div className="lot" id="lot2">
              <h3>Lot 2</h3>
              <div className="availability">
                <p>Available Spots: <span id="lot2-available">30</span></p>
              </div>
              <button className="alert-button" onClick={() => sendAlert('lot2')}>Send Alert</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 School Parking Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Example function for alerts
const sendAlert = (lotId) => {
    alert(`Alert for ${lotId}`);
};

export default ParkingDashboard;
