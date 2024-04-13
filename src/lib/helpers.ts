export const formatDate = (inputDate: string) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Parse the input date string
    const date = new Date(inputDate);

    // Extract date components
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the formatted date string
    const formattedDate = `${month} ${day}, ${year} @ ${formattedHours}:${formattedMinutes}${period}`;

    return formattedDate;
}