import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Logo from "../components/Logo";

import { ZodError, ZodIssue, z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a valid",
    })
    .email(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be greater than 6 and less than 20",
    })
    .min(6)
    .max(20),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loginFormError, setLoginFormError] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // const handleChange = useCallback(
  //   (val: any, name: any) => {
  //     setLoginForm((preVal) => ({ ...preVal, [name]: val }));
  //     console.log(loginForm);
  //   },
  //   [loginForm]
  // );

  const handleFormChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm({ ...loginForm, [prop]: event.target.value });
    };

  //validate the form data using LoginSchema
  useEffect(() => {
    if (loginForm.email === "" || loginForm.password === "") {
      return;
    }

    try {
      LoginSchema.parse(loginForm);
    } catch (error) {
      if (error instanceof ZodError) {
        const err = new ZodError<LoginFormData>(error.issues);
        const errors = err.flatten().fieldErrors;
        setLoginFormError({
          email: errors.email?.[0] ?? "",
          password: errors.password?.[0] ?? "",
        });
      }
    }
  }, [loginForm]);

  // @xkong-study can you please add types to these functions?
  const setCookie = (name: any, value: any, expiryDate: any) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + expiryDate);
    document.cookie = name + "=" + value + "; expires=" + currentDate;
  };

  // @xkong-study can you please add types to these functions?
  const getCookie = (name: any) => {
    const arr = document.cookie.split("; ");
    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i].split("=");
      if (arr2[0] === name) {
        return arr2[1];
      }
    }
    return "";
  };

  // no validation ?
  // const submit = () => {
  //   if (loginForm.password !== "" && loginForm.name !== "") {
  //     setCookie("username", loginForm.name, 1);
  //     setCookie("password", loginForm.password, 1);
  //     console.log(loginForm.name, loginForm.password);
  //     navigate("../home");
  //   } else {
  //     alert("userName and password cannot be none");
  //   }
  // };
  return (
    <div className="flex h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div>
          <div className="w-full h-40 flex justify-center items-center overflow-clip">
            <Logo className="h-72 w-72 translate-y-8" />
          </div>
          <h1 className="text-center text-5xl font-bold text-gray-900">SAGE</h1>
        </div>
        <form className="mt-20 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={loginForm.email}
                onChange={handleFormChange("email")}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleFormChange("password")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-500 hover:text-black"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
