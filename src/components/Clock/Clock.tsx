import React, { useState, useEffect } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
// import { TimePicker } from 'antd';

export const Clock = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
 
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isClient]); // Adding isClient as a dependency

  return (
    <>
      <FormattedDate value={currentDate} year='numeric' month='long' day='2-digit'/>
      <FormattedTime value={currentTime} hour='numeric' minute='numeric' second='numeric' />
    </>
  );
};

export default Clock;
