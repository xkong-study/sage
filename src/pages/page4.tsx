import React, {useEffect, useState} from "react";
import { ChevronLeftIcon, MapPinIcon, ArrowsUpDownIcon, ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
import {Input} from "antd-mobile";
import { AiFillCar } from "react-icons/ai";
import {BiWalk,BsBusFrontFill,BsFillTrainFreightFrontFill} from "react-icons/all"
import TimeSelector from "../components/TimeSelector";
import { useDispatch, useSelector} from 'react-redux'
import {incrementByAmount, incrementByHidden} from "../store/reducer";
import { RootState } from "../store";
import { FcCheckmark } from "react-icons/fc";
import { Mask } from 'antd-mobile'
import moment from "moment";
import {useLocation, useNavigate} from "react-router-dom";

export default function SearchPlace() {
    const hidden = useSelector((state: RootState) => state.user.value)
    const navigate = useNavigate()
    useEffect(()=>{
        if(hidden=='hidden') {
            setVisible_bg(false)
            console.log(visible_bg)
        }
        else{
            setVisible_bg(true)
            console.log(visible_bg)
        }
    },[hidden])
    const location = useLocation()
    let placeHolder: string
    if(location.state!=null){
        placeHolder = location.state.name
    }
    else{
        placeHolder = 'choose destination'
    }
    console.log(placeHolder)
    const [content,setContent] = useState('your position');
    const [icons, setIcons] = useState(<div className="w-3 h-3 bg-blue-500 rounded-full border-2"></div>)
    const [icon2, setIcon2] = useState(<MapPinIcon className="bg-red w-4 h-4 mt-2 -mx-0.5"/>)
    const [show, setShow] = useState('none');
    const [visible, setVisible] = useState('none');
    const [visible1, setVisible1] = useState('none');
    const [visible2, setVisible2] = useState('none');
    const [visible_bg, setVisible_bg] = useState(false)
    const dispatch = useDispatch()

    const Timer=()=>{
        hidden=='hidden'?dispatch(incrementByAmount('block')):dispatch(incrementByAmount('hidden'))
        if(hidden=='hidden'){
            setVisible_bg(true)
            dispatch((incrementByHidden('true')))
        }
        else{
            setVisible_bg(false)
            dispatch((incrementByHidden('false')))
        }
    }
    const exchange=()=>{
        if(content=='your position') {
            setContent(`${placeHolder}`)
            setIcons(<div className="w-3 h-3 bg-white-500 rounded-full border-2"></div>)
            setIcon2(<div className="w-3 h-3 bg-blue-500 rounded-full border-2 mt-3"></div>)
        }
        else{
            setContent('your position')
            setIcons(<div className="w-3 h-3 bg-blue-500 rounded-full border-2"></div>)
            setIcon2(<MapPinIcon className="bg-red w-4 h-4 mt-2 -mx-0.5"/>)
        }
    }
    const choose=()=>{
        if(show=='none'){
            setShow('block')
        }
        else{
            setShow('none')
        }
    }
    const Selector=()=>{
        if(visible=='none'){
            setVisible('block')
        }
        else{
            setVisible('none')
        }
    }
    const Selector1=()=>{
        if(visible1=='none'){
            setVisible1('block')
        }
        else{
            setVisible1('none')
        }
    }
    const Selector2=()=>{
        if(visible2=='none'){
            setVisible2('block')
            console.log(visible)
        }
        else{
            setVisible2('none')
            console.log(visible)
        }
    }
    return (
        <div>
        <div className="w-full h-36 bg-white-500 top-0 border border-b-2 border-collapse">
            <Mask
                visible={visible_bg}
                opacity='thin'
                className="z-20"
            />
            <div>
                    <div className="flex top-0">
                    <ChevronLeftIcon className="h-10 w-8" aria-hidden="true" onClick={()=>navigate(-1)}/>
                    <div className="mt-4 mx-4">
                        {icons}
                    <div className="w-1 h-1 bg-black rounded-full mx-1 mt-2"></div>
                    <div className="w-1 h-1 bg-black rounded-full mx-1 mt-1"></div>
                    <div className="w-1 h-1 bg-black rounded-full mx-1 mt-1"></div>
                        {icon2}
                    </div>
                    <div className="flex flex-col">
                    <div className="relative mt-2 mx-1">
                    <button type="button"
                            className="w-72 mx-1 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                    <span className="flex items-center">
                          <Input style={{fontSize: "10px"}} placeholder={content=='your position'?'your position':`${placeHolder}`}/>
                    </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"/>
                    </button>
                    </div>
                <div className="relative mt-2 -mx-12">
                    <button type="button"
                            className="w-72 h-10 mx-14 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                    <span className="flex items-center">
                     <Input style={{fontSize: "10px"}} placeholder={content=='your position'?`${placeHolder}`:'your position'}/>
                    </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"/>
                    </button>
                </div>
                    </div>
                        <div>
                            <ArrowsUpDownIcon className="h-5 w-5 mt-10" onClick={exchange}/>
                        </div>
               </div>
                <div className="flex flex-row justify-around mt-5">
                 <AiFillCar className="w-4 h-4 mx-6"/>
                 <BiWalk className="w-4 h-4 mx-6"/>
                 <BsFillTrainFreightFrontFill className="w-4 h-4 mx-6"/>
                 <BsBusFrontFill className="w-4 h-4 mx-6"/>
                </div>
            </div>
        </div>
                <div className="w-full h-14 bg-white-500 top-0 border border-b-2 border-collapse">
                <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                <div className="mx-5 mt-4 cursor-pointer" onClick={Timer}>
                    {moment().calendar().split(' ')[2]} leave
                </div>
                <ChevronDownIcon className="h-5 w-5 mt-4 cursor-pointer -ml-5" onClick={Timer}/>
                </div>
                <div className="mx-5 mt-4 cursor-pointer" onClick={choose}><p className="text-blue-600">route choose</p></div>
                </div>
                </div>
            {
                show=='block'?
                <div className="w-full h-14 bg-white-500 top-0 border border-b-2 border-collapse">
                    <div className="flex flex-row justify-start">
                            <div className="mx-5 mt-4 cursor-pointer" onClick={Selector}>
                                <p>best route</p>
                            </div>
                        {visible=='block'?<FcCheckmark className="h-4 w-4 mt-4 -ml-3" aria-hidden="true"/>:null}
                            <div className="mx-5 mt-4 cursor-pointer -mr-0" onClick={Selector1}>
                                <p>minimum transfer</p>
                            </div>
                        {visible1=='block'?<FcCheckmark className="h-4 w-4 mt-4 ml-2" aria-hidden="true"/>:null}
                            <div className="mx-5 mt-4 cursor-pointer" onClick={Selector2}>
                                <p>least walk</p>
                            </div>
                        {visible2=='block'?<FcCheckmark className="h-4 w-4 mt-4 -ml-3" aria-hidden="true"/>:null}
                    </div>
                </div>:null
            }
            <div className="w-full h-36 bg-white-500 border border-b-2 border-collapse">
                <div className="flex flex-col">
                    <div className="mx-5 mt-2"><p>Recommend Route</p></div>
                    <div className="mt-2">
                        <div className="flex flex-row justify-between">
                        <div className="flex flex-row mt-5">
                            <BiWalk className="w-4 h-4 mx-5 mr-3"/>
                            <ChevronRightIcon className="h-4 w-4" aria-hidden="true"/>
                            <BsBusFrontFill className="w-4 h-4 mx-3"/>
                            <ChevronRightIcon className="h-4 w-4" aria-hidden="true"/>
                            <BiWalk className="w-4 h-4 mx-3"/>
                        </div>
                        <div className="mr-5"><p>13 min</p></div>
                        </div>
                    </div>
                    <div className="mx-5 mt-5"><p>{moment().calendar().split(' ')[2]}-{moment().calendar().split(' ')[2]}</p></div>
                    <div className="mx-5 mt-1"><p>Every 3 minutes from Dawson</p></div>
                </div>
            </div>
            <div className="w-full h-40 bg-white-500 border border-b-8 border-t-8 border-collapse">
                <div className="flex flex-col">
                    <div className="mx-5 mt-2"><p>Other Option</p></div>
                    <div className="mt-2">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row mt-5">
                                <BiWalk className="w-4 h-4 mx-5 mr-3"/>
                                <ChevronRightIcon className="h-4 w-4" aria-hidden="true"/>
                                <BsBusFrontFill className="w-4 h-4 mx-3"/>
                            </div>
                            <div className="mr-5"><p>15 min</p></div>
                        </div>
                    </div>
                    <div className="mx-5 mt-5"><p>{moment().calendar().split(' ')[2]}-{moment().calendar().split(' ')[2]}</p></div>
                    <div className="mx-5 mt-1"><p>Every 3 minutes from Dawson</p></div>
                </div>
            </div>
            {
                hidden!='hidden'?
                <div className="absolute h-30 w-full z-50 bottom-0">
                 <TimeSelector/>
                </div>:null
            }
        </div>
    )
}
