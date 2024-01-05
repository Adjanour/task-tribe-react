export interface CustomDate {
    "$L": string;  // Language
    "$u"?: undefined;  // Some property with undefined value
    "$d": Date;  // Date object
    "$y": number;  // Year
    "$M": number;  // Month
    "$D": number;  // Day
    "$W": number;  // Weekday
    "$H": number;  // Hour
    "$m": number;  // Minute
    "$s": number;  // Second
}
/**
 * Fetches holidays from the holiday API within a specified date range.
 * @param {string} startDate - The start date of the range in format 'yyyy-mm-dd'. If not provided, defaults to December of the current year.
 * @param {string} endDate - The end date of the range in format 'yyyy-mm-dd'.
 * @returns {Promise<Array<Object>>} - An array of holiday objects with id, name, and date properties.
 */

/**
 * Converts a CustomDate object to a string representation in the format "YYYY-MM-DD".
 * @param dateString - The CustomDate object to convert.
 * @returns The string representation of the CustomDate object.
 */
export function processDateString(dateString: CustomDate|any) {
    // Extract year, month, and day from the CustomDate object
    const year = dateString.$y;
    const month = dateString.$M + 1;
    const day = dateString.$d.toISOString().split('T')[0].split('-')[2];
    console.log(dateString);
    console.log(dateString.$d.toISOString().split('T')[0].split('-')[2]);

    // Format the extracted values as a string in the format "YYYY-MM-DD"
    const formattedDateString = `${year}-${month}-${day}`;

    return formattedDateString;
}
