import React, { useState } from "react";

export default function SignUp() {
  const [active, setActive] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="page-wrapper w-screen h-screen flex justify-center items-center bg-gradient-to-b from-black to-purple-900">
      <div className=" main bg-neutral-800 w-full  max-w-md rounded-2xl p-4 flex flex-col gap-4">
        <div className="nav flex justify-between px-3 items-center">
          <div className="div flex border-2 border-black p-1 rounded-2xl gap-2 bg-black text-white">
            <button
              className={active ? "bg-white p-1 text-black rounded-2xl" : ""}
              onClick={() => {
                setActive(true);
              }}
            >
              signup
            </button>
            <button
              className={!active ? "bg-white p-1 text-black rounded-2xl" : ""}
              onClick={() => setActive(false)}
            >
              signin
            </button>
          </div>
          <button className="bg-neutral-600 rounded-full w-7 h-7 text-white text-sm">
            ✕
          </button>
        </div>
        {active ? (
          <>
            <h1 className="text-white text-xl">Create an Account</h1>
            <div className="fields flex flex-col gap-2">
              <div className="name flex gap-2">
                <input
                  type="text"
                  placeholder="full name"
                  className="bg-neutral-700 text-black outline-0 px-2 w-full py-2 rounded-[5px]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-neutral-700 outline-0 py-1 rounded-[5px] px-2 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="w-full bg-neutral-700 text-black outline-0 py-1 px-2 rounded-[5px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="confirm password"
                className="w-full bg-neutral-700 text-black outline-0 py-1 px-2 rounded-[5px]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="bg-purple-700 hover:bg-purple-900 w-full py-2 rounded-2xl text-white font-bold transition-colors duration-200">
              Create an account
            </button>
            <p className=" text-center uppercase text-gray-500 text-xs">or sigin with</p>
            <div className="flex gap-3">
              <button className="w-full bg-neutral-700 hover:bg-neutral-600 py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button className="w-full bg-neutral-700 hover:bg-neutral-600 py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs">
              By creating an account, you agree to our{" "}
              <span className="underline cursor-pointer hover:text-gray-300">Terms & Service</span>
            </p>
          </>
        ) : (  <> 
        <h1 className="text-white text-xl">Already have an Account</h1>
      <div className="fields flex flex-col gap-2">
       
        <input type="email" placeholder="Enter your email" className="w-full bg-neutral-700 outline-0 py-1 rounded-[5px] px-2 text-black" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" className="w-full bg-neutral-700 text-black outline-0 py-1 px-2 rounded-[5px]" value={password} onChange={(e) => setPassword(e.target.value)}/>
       
      </div>
      <button className="bg-purple-700 hover:bg-purple-900 w-full py-2 rounded-2xl text-white font-bold transition-colors duration-200">Sign in</button>
      <p className=" text-center uppercase text-gray-500 text-xs">or sigin with</p>
        <div className="flex gap-3">
            <button className="w-full bg-neutral-700 hover:bg-neutral-600 py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center">
              {/* Google Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="w-full bg-neutral-700 hover:bg-neutral-600 py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center">
              {/* Apple Icon */}
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs">
            By creating an account, you agree to our{" "}
            <span className="underline cursor-pointer hover:text-gray-300">Terms & Service</span>
          </p>
        </>)}
        </div>
        </div>
        
      
    
  );
}
