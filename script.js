const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
// Drop down list
const movieSelect = document.getElementById('movie');

// Populate UI from local storage data
populateUI();

// Parse ticket price from string to number by + sign
let ticketPrice = +movieSelect.value;

// Save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selectedSeats node list values to a new array; map through it; return new array of indexes of selected seats: each selected seat is uniquely identified by its array index
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // Save to local storage as key-value pairs
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  // Calculate and display selected seats count and total ticket fare
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
  // Read data from local storage
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {

      // Check weather if the index values from local storage are within the array
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  // Read data from local storage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    // Set the dropdown list selected option  
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event from Drop down list
movieSelect.addEventListener('change', e => {

  // Parse target element`s (option tag) value from string to number by + sign
  ticketPrice = +e.target.value;

  // Save selected movie index and price to local storage; in the dropdown list, each list option value is uniquely identified by the option list array index
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event on container
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total value set
updateSelectedCount();