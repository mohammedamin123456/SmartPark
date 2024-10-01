document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and update parking data
    // Function to update parking data and add animations
// Function to update parking data and add animations
function updateParkingData() {
    fetch('/get_parking_data')
        .then(response => response.json())
        .then(data => {
            const parkingDataContainer = document.getElementById('parking-data');
            parkingDataContainer.innerHTML = ''; // Clear previous data

            data.forEach(lot => {
                const lotElement = document.createElement('div');
                lotElement.classList.add('lot');

                const availableSpots = parseInt(lot.available_spots);
                const totalSpots = parseInt(lot.total_spots);

                let percentage = 0;
                if (!isNaN(availableSpots) && !isNaN(totalSpots) && totalSpots > 0) {
                    percentage = ((availableSpots / totalSpots) * 100).toFixed(2);
                }

                // Create HTML structure for each parking lot
                lotElement.innerHTML = `
                    <h3>${lot.lot_name}</h3>
                    <p>Available Spots: ${lot.available_spots}</p>
                    <p>Total Spots: ${lot.total_spots}</p>
                    <div class="progress-bar-container">
                        <div class="progress-bar" data-percentage="${percentage}"></div>
                    </div>
                    <p>${percentage}% Available</p>
                    <button 
                        class="alert-button" 
                        data-lot="${lot.lot_name}" 
                        data-available="${lot.available_spots}" 
                        data-total="${lot.total_spots}">
                        Check Availability
                    </button>
                `;

                // Append the lot element to the container
                parkingDataContainer.appendChild(lotElement);
            });

            // Rebind alert buttons
            bindAlertButtons();

            // After rendering, start observing the progress bars
            observeProgressBars();
        })
        .catch(error => console.error('Error fetching parking data:', error));
}

// Function to observe when progress bars come into view
function observeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the percentage from data attribute and animate the bar
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = `${percentage}%`;
                observer.unobserve(progressBar); // Stop observing once animation is triggered
            }
        });
    }, {
        threshold: 0.2 // Trigger the animation when 20% of the progress bar is visible
    });

    // Observe each progress bar
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}


    // Function to bind alert buttons
    function bindAlertButtons() {
        const buttons = document.querySelectorAll('.alert-button');

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const lotName = this.getAttribute('data-lot');
                const availableSpots = parseInt(this.getAttribute('data-available'));
                const totalSpots = parseInt(this.getAttribute('data-total'));

                if (!isNaN(availableSpots) && !isNaN(totalSpots) && totalSpots > 0) {
                    const percentage = ((availableSpots / totalSpots) * 100).toFixed(2);
                    alert(`Parking Lot: ${lotName}\nAvailable Spots: ${availableSpots}\nPercentage Available: ${percentage}%`);
                } else {
                    alert(`Parking Lot: ${lotName}\nAvailable Spots: ${availableSpots}\nTotal Spots: Unknown or Not Available`);
                }
            });
        });
    }

    // Function to animate the progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = `${percentage}%`;  // Set the width based on the percentage
        });
    }

    // Initial fetch when the page loads
    updateParkingData();

    // Fetch updated data every 10 seconds
    setInterval(updateParkingData, 10000);
});
