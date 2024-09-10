export const dateFilter = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp);

    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = date.getDate();
    const month = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();

    return `${dayName} ${day} ${month} ${year}`;
}