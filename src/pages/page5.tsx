import React, {useState, Fragment} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import { Badge, TabBar } from 'antd-mobile'
import {
    MapIcon,
    MapPinIcon,
    ChevronLeftIcon,
    MagnifyingGlassIcon,
    ClockIcon,
    XMarkIcon
} from '@heroicons/react/20/solid'
import {BiBus,AiOutlineSave,BiMap,FiCornerUpRight} from "react-icons/all"
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {useLocation, useNavigate} from 'react-router-dom';

import {
    UserOutline,
} from 'antd-mobile-icons'

const location = [
    {id: 1, name: 'Hamiltion Building'},
    {id: 2, name: '1937'},
    {id: 3, name: 'Phenix Building'},
    {id: 4, name: 'Dorset Point'},
    {id: 5, name: 'Widow Street'},
    {id: 6, name: 'Cindy House'},
]

const tabs = [
    {
        key: 'home',
        title: 'findWay',
        icon: <BiMap />,
        badge: Badge.dot,
    },
    {
        key: 'Page2',
        title: 'goOut',
        icon: <BiBus />,
        badge: '5',
    },
    {
        key: 'Page3',
        title: 'SaveRoute',
        icon: <AiOutlineSave/>,
        badge: '99+',
    },
    {
        key: 'personalCenter',
        title: 'Mine',
        icon: <UserOutline />,
    },
]

export default function MyCombobox() {
    const navigate =useNavigate()
    const {isLoaded} = useJsApiLoader({
        id: 'd07532df77f9d9a5',
        googleMapsApiKey: 'AIzaSyBxhljI-42-8Sn2UOAVf3Cw_9lH4otQ6vY',
        libraries: ['geometry', 'drawing'],
    });
    const [selected, setSelected] = useState('')
    const [query, setQuery] = useState('')
    const location1 = useLocation()
    const { pathname } = location1
    const setRouteActive = (value: string) => {
        console.log(value)
        navigate(`../${value}`)
    }

    if(typeof selected=="object"){
        navigate('/Page4', {
            state: {
                id: `${selected.id}`,
                name: `${selected.name}`,
            }
        });
    }


    const containerStyle = {
        width: screen.width,
        height: screen.height
    };
    const center = {
        lat: 53.49332,
        lng: -6.31718
    };
    const options = {
        // 将 `language` 属性添加到 `options` 对象中
        ...{
            zoomControl: true,
            streetViewControl: false,
        },
        language: "en-GB" // 设置地图的语言为中文
    };
    const filteredLocation =
        query === ''
            ? location
            : location.filter((location) =>
                location.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const Delete = (value:number) => {
        console.log(value)
    }

    const jump = (props:number)=>{
        if(props==1){
            navigate('/Page2')
        }
        if(props==2){
            navigate('/Page4')
        }
    }
    return (
        <div className="h-[100vh] w-[100vw] bg-white">
            {isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                options={options}
            >
            </GoogleMap>
            }
            <div className="fixed top-16 w-full py-2 pl-3 pr-3">
                <Combobox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <div
                            className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <div className="flex space-x-2 ">
                                <ChevronLeftIcon className="h-10 w-5"/>
                                <Combobox.Input
                                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                    displayValue={(person: any) => person.name}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder='search here'
                                />
                            </div>
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <MagnifyingGlassIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                                <Combobox.Options
                                    className="absolute mt-1 h-800 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <div className="flex space-x-20 px-10 pb-2 pt-2">
                                        <h1 className='w-60'>My current location</h1>
                                        <MapIcon className="h-5 w-5" aria-hidden="true"/>
                                    </div>
                                    <div className="w-full h-0.5 bg-gray-500 rounded mx-auto my-2"></div>
                                    <div className="flex space-x-20 px-10 pb-2 pt-2">
                                        <h1 className='w-60'>Choose from the map</h1>
                                        <Combobox.Button className="h-5 w-5">
                                            <MapPinIcon className="h-5 w-5" aria-hidden="true"/>
                                        </Combobox.Button>
                                    </div>
                                    <div className="w-full h-0.5 bg-gray-500 rounded mx-auto my-2"></div>
                                    <h1 className='w-60 px-5'>History/Suggested</h1>
                                    {filteredLocation.length === 0 && query !== '' ? (
                                        <div
                                            className="relative cursor-default select-none py-2 px-5 text-gray-700 h-full">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredLocation.map((location) => (
                                            <Combobox.Option
                                                key={location.id}
                                                className={({active}) =>
                                                    `relative cursor-default select-none py-2  pr-4 ${
                                                        active ? 'bg-white text-black' : 'text-black'
                                                    }`
                                                }
                                                value={location}
                                            >
                                                {({selected, active}) => (
                                                    <>
                                                        <div className="flex space-x-5 px-10 pb-2 pt-2">
                                                            <ClockIcon className="h-5 w-5 space-x-3"
                                                                       aria-hidden="true"/>
                                                            <span
                                                                className={`block truncate w-60 ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {location.name}
                                                        </span>
                                                            {selected ? (
                                                                <span
                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 w-200${active ? 'text-white' : 'text-teal-600'}`}/>
                                                            ) : null}
                                                            <XMarkIcon className="h-5 w-5 right-0" aria-hidden="true" onClick={()=>Delete(location.id)}/>
                                                        </div>
                                                        <div className="w-full h-0.5 bg-gray-500 rounded mx-auto my-2"/>
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
                <button className="rounded-full bg-blue-600 absolute right-6 w-16 h-16 z-10 mt-80 top-32" onClick={()=>navigate('/Page4')}>
                    <div className="bg-white w-4 h-4 z-20 rotate-45 mx-auto">
                        <FiCornerUpRight className=" w-3 h-3 z-30 mx-auto -rotate-45"/>
                    </div>
                </button>
            </div>
            <TabBar className="absolute h-30 w-full z-50 bottom-0 bg-white cursor-pointer" activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    )
}
