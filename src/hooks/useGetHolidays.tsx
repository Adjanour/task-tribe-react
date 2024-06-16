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
    date: string; // The date of the holiday in format "YYYY-MM-DD".
    date_year: string; // The year of the holiday.
    date_month: string; // The month of the holiday (numeric value).
    date_day: string; // The day of the holiday (numeric value).
    week_day: string; // The day of the week the holiday falls on.
}

const API_KEY = '7e488581-b5cf-4f4a-8332-0aba5f353c31'; // Ideally, keep API keys in environment variables

export const fetchHolidays = async (startDate: string, endDate: string): Promise<Holiday[]> => {
    try {
        const year = new Date(startDate).getFullYear()-1;
        const month = new Date(startDate).getMonth() + 1;
        const response = await Axios.get(`https://holidayapi.com/v1/holidays`, {
            params: {
                key: API_KEY,
                country: 'GH',
                year,
                month,
                pretty: true,
            },
        });

        const holidays: Holiday[] = response.data.holidays.map((holiday: any) => ({
            name: holiday.name,
            name_local: holiday.name_local,
            language: holiday.language,
            description: holiday.description,
            country: holiday.country,
            location: holiday.location,
            type: holiday.type,
            date: holiday.date,
            date_year: holiday.date_year,
            date_month: holiday.date_month,
            date_day: holiday.date_day,
            week_day: holiday.week_day,
        }));

        return holidays;
    } catch (error) {
        console.error('Error fetching holidays:', error);
        throw new Error('Error fetching holidays');
    }
};

/**
 * Custom hook to fetch holidays between a start and end date.
 * @param start - The start date in string format (YYYY-MM-DD).
 * @param end - The end date in string format (YYYY-MM-DD).
 * @returns An array of holidays between the start and end date.
 */
export const useGetHolidays = (start: string, end: string) => {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        /**
         * Fetches holiday data from the server and updates the holidays state.
         */
        const fetchHolidayData = async () => {
            try {
                const holidayData = await fetchHolidays(start, end);
                setHolidays(holidayData);
            } catch (error) {
                setError('There was an error fetching the holidays.');
                notification.error({ message: `${error}` });
            }
        };

        if (start && end) {
            fetchHolidayData().catch((err) => {
                notification.error({ message: "There was an error getting holidays" });
            });
        }
    }, [start, end]);

    // Filtering holidays within the date range
    const filteredHolidays = holidays.filter(
        (holiday) => {
            const holidayDate = new Date(holiday.date).getFullYear();
            const startDate = new Date(start).getFullYear()-1;
            const endDate = new Date(end).getFullYear()-1;
            return holidayDate >= startDate && holidayDate <= endDate;
        }
    );
    console.log(filteredHolidays)

    if (error) {
        notification.error({ message: error });
    }

    return filteredHolidays;
};
