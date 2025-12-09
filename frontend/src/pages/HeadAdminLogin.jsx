import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import api from "../api/axios"

const HeadAdminLogin = () => {

    
    const navigate = useNavigate();

    const [userId, setuserId] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false)
    

        const login = async(e)=>{
            e.preventDefault();

            try {
              setloading(true);
                const res = await api.post(`/auth/headadminLogin` , {
                    userId : userId,
                    password : password,
                }); 
                // alert ("login sucess");
                localStorage.setItem("token", res.data.token);

                const adminId = res.data.user.id;

                navigate(`/headAdminDashboard`)

            } catch (error) {
                
                alert("invalid credentials");
            }
            finally{
              setloading(false);
            }
        }

        // if(loading) return <Loader className="w-screen h-screen"/>

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-12 font-mono">
      {loading && (
  <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
    <Loader />
  </div>
)}

      <div className="bg-white w-full max-w-md md:max-w-lg rounded-xl shadow-xl p-8 flex flex-col gap-8">
        
        <div className="text-center font-bold text-2xl">ADMIN Login</div>

        <div className="flex flex-col gap-5">
          {/* CLUB ID */}
          <div className="flex flex-col gap-1">
            <label htmlFor="clubId" className="text-sm font-semibold">ADMIN ID</label>
            <input
              type="text"
              id="clubId"
              placeholder="Enter Club ID"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={userId}
              onChange={(e)=>{setuserId(e.target.value)}}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
               value={password}
              onChange={(e)=>{setpassword(e.target.value)}}
            />
          </div>
        </div>

        {/* BUTTON + SWITCH */}
        <div className="flex items-center justify-between text-sm">
          <button type="submit" onClick={login} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Log In
          </button>

        </div>
      </div>
    </div>
  );
};

export default HeadAdminLogin;
