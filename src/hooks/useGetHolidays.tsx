import { useState, useEffect } from 'react';
import Axios from 'axios';
import { notification } from 'antd';

export type Holiday = {
    name: string; // The name of the holiday.
    name_local?: string; // The local name of the holiday (optional).
    language?: string; // The language of the holiday name (optional).
    description?: string; // A description of the holiday (optional).
    country: string; // The country where the holiday is observed.
    location?: string; // The specific location within the country where the holiday is observed (optional).
    type: string; // The type of the holiday (e.g., National, Public, Observance).
    date: string; // The date of the holiday in format "DD/MM/YYYY".
    date_year: string; // The year of the holiday.
    date_month: string; // The month of the holiday (numeric value).
    date_day: string; // The day of the holiday (numeric value).
    week_day: string; // The day of the week the holiday falls on.
}

export const fetchHolidays = async (startDate: string, endDate: string): Promise<Holiday[]> => {
    try {
        // Make API request to get holiday data
        const response = await Axios.get(`https://holidayapi.com/v1/holidays?pretty&key=7e488581-b5cf-4f4a-8332-0aba5f353c31&country=GH&year=2023&month=${startDate ? startDate.split('-')[1] : '12'}`);
        const holidayData = response.data;

        // Transform holiday data into desired format
        const holidays:Holiday[] = holidayData.holidays.map((holiday: Holiday, key: number) => ({
            id: key,
            name: holiday.name,
            date: holiday.date,
        }));

        return holidays;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching holidays');
    }
}
// 22-02-05
// Hook to fetch holidays
/**
 * Custom hook to fetch holidays between a start and end date.
 * @param start - The start date in string format.
 * @param end - The end date in string format.
 * @returns An array of holidays between the start and end date.
 */
export const useGetHolidays = (start: string, end: string) => {
    const [holidays, setHolidays] = useState<Holiday[]>([]);


    useEffect(() => {
        /**
         * Fetches holiday data from the server and updates the holidays state.
         */
        const fetchHolidayData = async () => {
            try {
                const holidayData = await fetchHolidays(start, end);
                setHolidays(holidayData);
            } catch (error) {
                notification.error({message:`${error}`})
            }
        };
        if (start && end) {
            try {
                fetchHolidayData();
            } catch (error) {
                notification.error({message:"There was an error getting Holidays"})
            }
            
        }
    }, [start, end]);
    
    return holidays.filter(
        (holiday) =>
            holiday.date.split("-")[2] >= start.split("-")[2] &&
            holiday.date.split("-")[2] <= end.split("-")[2]
    );
};