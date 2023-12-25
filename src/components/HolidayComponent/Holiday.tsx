import {useGetHolidays} from "@/hooks/useGetHolidays";
import {Popover} from "antd";

export const HolidayComponent =  ({startDate,endDate}:{startDate:string,endDate:string}) =>{
    const holidays = useGetHolidays(startDate,endDate);
    return (
        <Popover
        content={
            <div className="p-1 rounded-md  bg-white justify-center  w-fit m-auto">
                <table className="table">
                    <thead className="">
                    <th className="text-sm ml-1">Holiday</th>
                    <th className="text-sm">Date</th>
                    </thead>
                    <tbody>
                    {holidays.map((holiday:any) => (
                        <tr key={holiday.id} className="table-row">
                            <td className="text-sm table-cell ml-2" >{holiday.name}</td>
                            <td className="text-sm table-cell ml-2" >{holiday.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        }
        >
            <a> <p className="mt-1 text-blue-300">There {holidays.length===1?'is':'are'} {holidays.length} {holidays.length===1?'Holiday':'Holidays'}</p></a>
        </Popover>
    );
}

