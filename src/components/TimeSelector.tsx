import React, { useEffect, useState } from 'react'
import { PickerView,Button } from 'antd-mobile'
import { CapsuleTabs } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../store";
import {incrementByAmount, incrementByHidden} from "../store/reducer";

export const basicColumns = [
    [
        { label: 'Monday', value: 'Mon' },
        { label: 'Tuesday', value: 'Tues' },
        { label: 'Wednesday', value: 'Wed' },
        { label: 'Thursday', value: 'Thur' },
        { label: 'Friday', value: 'Fri' },
        { label: 'Saturday', value: 'Sat' },
        { label: 'Sunday', value: 'Sun' },
    ],
    [
        { label: '00', value: '00' },
        { label: '01', value: '01' },
        { label: '02', value: '02' },
        { label: '03', value: '03' },
        { label: '04', value: '04' },
        { label: '05', value: '05' },
        { label: '06', value: '06' },
        { label: '07', value: '07' },
        { label: '08', value: '08' },
        { label: '09', value: '09' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
    ],
    [
        { label: '00', value: '00' },
        { label: '01', value: '01' },
        { label: '02', value: '02' },
        { label: '03', value: '03' },
        { label: '04', value: '04' },
        { label: '05', value: '05' },
        { label: '06', value: '06' },
        { label: '07', value: '07' },
        { label: '08', value: '08' },
        { label: '09', value: '09' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' },
        { label: '25', value: '25' },
        { label: '26', value: '26' },
        { label: '27', value: '27' },
        { label: '28', value: '28' },
        { label: '29', value: '29' },
        { label: '30', value: '30' },
        { label: '31', value: '31' },
        { label: '32', value: '32' },
        { label: '33', value: '33' },
        { label: '34', value: '34' },
        { label: '35', value: '35' },
        { label: '36', value: '36' },
        { label: '37', value: '37' },
        { label: '38', value: '38' },
        { label: '39', value: '39' },
        { label: '40', value: '40' },
        { label: '41', value: '41' },
        { label: '42', value: '42' },
        { label: '43', value: '43' },
        { label: '44', value: '44' },
        { label: '45', value: '45' },
        { label: '46', value: '46' },
        { label: '47', value: '47' },
        { label: '48', value: '48' },
        { label: '49', value: '49' },
        { label: '50', value: '50' },
        { label: '51', value: '51' },
        { label: '52', value: '52' },
        { label: '53', value: '53' },
        { label: '54', value: '54' },
        { label: '55', value: '55' },
        { label: '56', value: '56' },
        { label: '57', value: '57' },
        { label: '58', value: '58' },
        { label: '59', value: '59' },
    ]
]
const Day = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const index = new Date().getDay()
const Week_day = Day[index].toString()
const Hour = new Date().getHours().toString()
const Minute = new Date().getMinutes().toString()

export default function TimeSelector() {
    const [value, setValue] = useState<(string | null)[]>([Week_day, Hour,Minute])
    console.log(value)
    const Show = useSelector((state:RootState)=>state.user.value)
    const dispatch = useDispatch()
    const Cancel=()=>{
        dispatch((incrementByAmount('hidden')))
    }

    return (
        <div>
            {
                Show=='block'?
                <div className="w-full h-33 flex-none bg-white p-2 border-t-2 border-black">
                    <CapsuleTabs>
                        <CapsuleTabs.Tab title='NowDay' key='NowDay' className='h-16'>
                            <PickerView
                                columns={basicColumns}
                                value={[Week_day, Hour,Minute]}
                                className='h-20 -mt-10'
                                key={0}
                            />
                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title='StartTime' key='StartTime' className='h-16'>
                            <PickerView
                                columns={basicColumns}
                                value={value}
                                onChange={(val, extend) => {
                                    setValue(val)
                                    console.log('onChange', val, extend.items)
                                }}
                                className='h-20 -mt-10'
                                key={1}
                            />
                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title='ArriveTime' key='ArriveTime' className='h-16'>
                            <PickerView
                                columns={basicColumns}
                                value={value}
                                onChange={(val, extend) => {
                                    setValue(val)
                                    console.log('onChange', val, extend.items)
                                }}
                                className='h-20 -mt-10'
                                key={2}
                            />
                        </CapsuleTabs.Tab>
                    </CapsuleTabs>
                    <div className="flex flex-row justify-between">
                        <Button className="flex-1" onClick={Cancel}>cancel</Button>
                        <Button className="flex-1">finish</Button>
                    </div>
                </div>:null
            }
        </div>
    )
}
