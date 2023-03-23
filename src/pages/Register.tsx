import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Input, NumberKeyboard, PasscodeInput,} from 'antd-mobile'

export default function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({name:'',password:''})

    const handleChange = useCallback((val:any, name:any) => {
        setForm(preVal => ({ ...preVal, [name]: val }))
        console.log(form)
    }, [form])


    const submit=()=>{
        if (form.password !== (''||undefined) && form.name !== (''||undefined)) {
            // axios({
            //     method: 'post',
            //     url: '/api/user/account/login',
            //     data: {
            //         username:form.name,
            //         password:form.password
            //     }
            // })
            //     .then(function (response) {
            // if(response.data.error_message == 'success'){
            navigate('../')
            window.location.reload()
            // }
            // });
        } else {
            alert("userName and password cannot be none")
        }
    }
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full ma   x-w-md space-y-8">
                <div>
                    <img className="mx-auto h-60 w-auto"
                         src="https://cdn.pixabay.com/photo/2017/09/29/08/42/gps-2798348_1280.png" alt="Your Company"/>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Saga</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true"/>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <Form.Item name='name' label='username' rules={[{required: true}]} style={{height: "10vh"}}>
                            <Input style={{fontSize: "16px"}} placeholder='please inout your name' value={form.name}
                                   onChange={(val) => handleChange(val,'name')}/>
                        </Form.Item>
                        <Form.Item name='address' label='password' rules={[{required: true}]} style={{height: "50%"}}>
                            <PasscodeInput keyboard={<NumberKeyboard/>} value={form.password}
                                           onChange={(val) => (val.length==6)&&handleChange(val,'password')}/>
                        </Form.Item>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember
                                me</label>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                onClick={submit}
                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"/>
            </svg>
          </span>
                            back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}
