// Timezone data with UTC offsets (in minutes)
const timezones = [
    { id: 'ny', name: 'New York', offset: -300 },           // UTC-5
    { id: 'london', name: 'London', offset: 0 },             // UTC+0
    { id: 'paris', name: 'Paris', offset: 60 },              // UTC+1
    { id: 'dubai', name: 'Dubai', offset: 240 },             // UTC+4
    { id: 'india', name: 'India', offset: 330 },             // UTC+5:30
    { id: 'singapore', name: 'Singapore', offset: 480 },     // UTC+8
    { id: 'tokyo', name: 'Tokyo', offset: 540 },             // UTC+9
    { id: 'sydney', name: 'Sydney', offset: 660 },           // UTC+11
    { id: 'la', name: 'Los Angeles', offset: -480 },         // UTC-8
    { id: 'toronto', name: 'Toronto', offset: -300 },        // UTC-5
    { id: 'mexico', name: 'Mexico City', offset: -360 },     // UTC-6
    { id: 'brazil', name: 'São Paulo', offset: -180 }        // UTC-3
];

/**
 * Format time with leading zeros
 */
function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Format date
 */
function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Update clock for a specific timezone
 */
function updateClock(timezone) {
    // Get current UTC time
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    
    // Create date for specific timezone
    const tzTime = new Date(utcTime + timezone.offset * 60000);
    
    // Get hours, minutes, seconds
    const hours = tzTime.getHours();
    const minutes = tzTime.getMinutes();
    const seconds = tzTime.getSeconds();
    
    // Update DOM elements
    const timeElement = document.getElementById(`${timezone.id}-time`);
    const dateElement = document.getElementById(`${timezone.id}-date`);
    
    if (timeElement) {
        timeElement.textContent = formatTime(hours, minutes, seconds);
    }
    
    if (dateElement) {
        dateElement.textContent = formatDate(tzTime);
    }
}

/**
 * Update all clocks
 */
function updateAllClocks() {
    timezones.forEach(timezone => {
        updateClock(timezone);
    });
}

/**
 * Initialize and start the clock
 */
function initClock() {
    // Initial update
    updateAllClocks();
    
    // Update every second
    setInterval(updateAllClocks, 1000);
}

// Start the clock when page loads
document.addEventListener('DOMContentLoaded', initClock);