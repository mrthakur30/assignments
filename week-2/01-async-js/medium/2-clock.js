
let count = 0;

function counter() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    // Format: HH:MM:SS
    console.log(`${formattedHours}:${minutes}:${seconds}`);

    // Format: HH:MM:SS AM/PM
    console.log(`${formattedHours}:${minutes}:${seconds} ${ampm}`);
}

setInterval(counter, 1000);