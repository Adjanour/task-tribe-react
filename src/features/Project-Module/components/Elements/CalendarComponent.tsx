'use client';
import React from 'react';
import type {Dayjs} from 'dayjs';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';

const CalendarComponent : React.FC = () =>{

    const onPanelChange = (value:Dayjs,mode:CalendarProps<Dayjs>['mode']) => {
            console.log(value.format('YYYY-MM-DD'),mode)
        }

    return <Calendar  onPanelChange={onPanelChange} onSelect={(date, { source }) => {
        if (source === 'date') {
          console.log('Panel Select:', date.format('YYYY-MM-DD'));
        }
      }}/>
}

export default CalendarComponent;