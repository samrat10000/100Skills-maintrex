// import React, { useEffect, useState } from "react";
// import testImg from "../assets/testimg.jpeg";
// import axios from "axios"
// import { useParams } from "react-router-dom";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdOutlineMoneyOff } from "react-icons/md";
// import { MdOutlineAttachMoney } from "react-icons/md";
// import { FaRegCircleDot } from "react-icons/fa6";
// import { CgSandClock } from "react-icons/cg";
// import Countdown from "./Countdown";


// const Base_URL = "http://localhost:5000/api"


// const EventInfo = () => {
//   const { id } = useParams();
//   const [eventData,setEventData] = useState([])
//   useEffect(() => {
    
//     const getDataById = async ()=>{

//       try {
//         const response = await axios.get(`${Base_URL}/events/get/${id}`);
//         console.log(response.data);
//         setEventData(response.data);

//       } catch (error) {
//         console.log(error);
//         alert("error fetching the event by id");
//       }

//     }
  
//       getDataById();

//   }, [id])





//   return (
//     <div className="h-full w-full bg-[#edecec] font-mono ">
//       {eventData &&(

//         <div>
//       <div className="h-[45vh] w-full bg-[white]  overflow-hidden ">
//         <img src={eventData.eventImage} alt="" className="h-full w-full object-cover" />
//       </div>
  
//       <div className="h-full w-full flex">

//       {/* box 1  */}
//         <div className="h-full w-full px-4 py-2 flex flex-col gap-2">

//           <div className="bg-white w-full h-[22%] rounded-xl px-2 py-2 flex gap-2">
//             {/* image div */}
//             <div className="border h-full w-[18%] rounded-xl px-1 py-1">
//                 <div className="overflow-hidden h-full"><img src={testImg} alt="" className="h-full w-full object-cover rounded-xs"/></div>
//             </div>

//               <div className="h-full w-[70%] px-1 py-1">
//                 <div className="text-gray-900 text-2xl font-bold"><span>{eventData.eventName} </span></div>

//                 <div className="text-gray-800 flex items-center gap-1"><FaLocationDot/><span>{eventData.location}</span></div>

//                 <div className="bg-green flex gap-2">
//                   {eventData.paymentType == "Free" ? ( <span className="border px-3 py-0.5 mt-2.5 flex gap-1 items-center rounded-xl"><MdOutlineMoneyOff className="text-red-500"/><span>FREE</span></span>):
//                   ( <span className="border px-3 py-0.5 mt-2.5 flex gap-1 items-center rounded-xl"><MdOutlineAttachMoney className="text-green-400"/><span>Paid</span></span>) }
  
//                   {eventData.mode == "online" ? (   <span className="text-blue-500 border border-black px-4 py-0.5 mt-2.5 flex gap-1 items-center rounded-xl">ONLINE</span>):
//                   (<span className="border px-4 py-0.5 mt-2.5 flex gap-1 items-center rounded-xl">OFFLINE</span>) }
//                 </div>
//               </div>

//               <div className="h-full flex flex-col items-center justify-between ">
//                 <span className="border rounded-2xl border-red-500 px-2 py-0.5 flex items-center gap-1.5 font-semibold text-red-600 "><FaRegCircleDot className="animate-pulse"/><span>LIVE</span></span>
//               </div>

//           </div>

//         <div className="bg-white w-full h-[22%] rounded-xl px-2 py-2 flex gap-2 justify-between items-center">
//                     {/* Timer */}
//                 <div className="h-full w-[60%] bg-cyan-300/25 rounded-xl px-2 text-xl flex flex-col gap-2 ">
//                       <div>REGISTRATION END's IN </div>
                   
//                       <div className="flex items-center gap-1">< CgSandClock className="text-3xl "/>
                      
//                       <Countdown startDate={eventData.registrationStartDate} endDate = {eventData.registrationEndDate} />
                      
//                       </div>
//                 </div>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-xs h-[20%]">REGISTER </button>

//         </div>

//          <div className="bg-white w-full h-[82%] rounded-xl px-2 py-2 flex gap-2 justify-between items-center">
//               <div>
//                 DESCRIPTION
//               </div>
//               <div>
//                 {/* {eventData.} */}
//               </div>

//         </div>

//         </div>


//       {/* box 2 */}

//       <div className=" h-full w-full px-4 py-2 ">
//           <div className="bg-white rounded-2xl h-full px-2 py-2">
//             Description
//           </div>
//       </div>



//       </div>
      
//       </div>
//        )}
//     </div>
//   );
// };

// export default EventInfo;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLocationDot, FaRegCircleDot } from "react-icons/fa6";
import { MdOutlineMoneyOff, MdOutlineAttachMoney } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import Countdown from "./Countdown";
import { useNavigate } from "react-router-dom";


const EventInfo = ({eventData , imageUrl}) => {


  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-[#edecec] font-mono">
      {/* {eventData && ( */}
        <div>
          {/* Top Image */}
          <div className="h-[30vh] sm:h-[45vh] w-full bg-white overflow-hidden">
            <img
              src={eventData.eventImage?.url}
              alt="event img"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="w-full flex flex-col lg:flex-row px-2 py-2 gap-2">
            {/* Box 1 */}
            <div className="w-full flex flex-col gap-2">
              {/* Event Info */}
              <div className="bg-white w-full rounded-xl px-2 py-2 flex sm:flex-row gap-2">
                {/* Image */}
                <div className="border h-[100px] w-[190px] sm:h-full sm:w-[18%] rounded-xl overflow-hidden px-0.5 py-0.5 ">
                  <img
                    src={imageUrl}
                    alt=""
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>

                {/* Event Details */}
                <div className="w-full sm:w-[70%] px-1 py-1 flex flex-col justify-between gap-1">
                  <div className="text-gray-900 text-xl sm:text-2xl font-bold">
                    {eventData.eventName}
                  </div>

                  <div className="text-gray-800 flex items-center gap-1 text-sm sm:text-base">
                    <FaLocationDot />
                    <span>{eventData.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                    {eventData.paymentType === "Free" ? (
                      <span className="border px-3 py-0.5 flex gap-1 items-center rounded-xl">
                        <MdOutlineMoneyOff className="text-red-500" /> FREE
                      </span>
                    ) : (
                      <span className="border px-3 py-0.5 flex gap-1 items-center rounded-xl">
                        <MdOutlineAttachMoney className="text-green-400" /> Paid
                      </span>
                    )}

                    {eventData.mode === "online" ? (
                      <span className="text-blue-500 border border-black px-4 py-0.5 flex gap-1 items-center rounded-xl">
                        ONLINE
                      </span>
                    ) : (
                      <span className="border px-4 py-0.5 flex gap-1 items-center rounded-xl">
                        OFFLINE
                      </span>
                    )}
                  </div>
                </div>

                {/* Live Badge */}
                {/* <div className=" ">
                  <span className="border rounded-2xl border-red-500 px-2 py-0.5 flex items-center gap-1.5 text-xs sm:text-base text-red-600 font-semibold">
                    <FaRegCircleDot className="animate-pulse" /> LIVE
                  </span>
                </div> */}
                {Date.now() < new Date(eventData.registrationEndDate).getTime() ? (
                   <div className=" ">
                  <span className="border rounded-2xl border-red-500 px-2 py-0.5 flex items-center gap-1.5 text-xs sm:text-base text-red-600 font-semibold">
                    <FaRegCircleDot className="animate-pulse" /> LIVE
                  </span>
                </div>
                ) : (
                    <div className=" ">
                  <span className="border rounded-2xl border-red-500 px-2 py-0.5 flex items-center gap-1.5 text-xs sm:text-base text-black font-semibold bg-red-400/80">
                   Ended
                  </span>
                </div>
                )}
              </div>

              {/* Timer */}
              <div className="bg-white w-full rounded-xl px-2 py-2 flex  sm:flex-row gap-3 justify-between items-center">
                <div className="w-full sm:w-[60%] bg-cyan-300/25 rounded-xl px-2 py-2 text-base sm:text-xl flex flex-col gap-2 text-center sm:text-left">
                  <div>REGISTRATION ENDS IN</div>
                  <div className="flex justify-center sm:justify-start items-center gap-2 text-base sm:text-xl">
                    <CgSandClock className="text-2xl" />
                    <Countdown
                      startDate={eventData.registrationStartDate}
                      endDate={eventData.registrationEndDate}
                    />
                  </div>
                </div>

                 <a
            href={eventData.registerLink}
            
          >
            <button  className="bg-blue-500 text-white px-2 py-5 sm:px-4 sm:py-2 rounded-md w-[100%]  sm:w-auto  sm:text-base">
                  
                  REGISTER
                </button>
          </a>
              </div>
                

              {/* Description */}
              <div className="bg-white w-full rounded-xl px-2 py-2 flex flex-col gap-2">
                <div className="text-lg font-semibold">DESCRIPTION</div>
                <div className="text-sm sm:text-base">{eventData.eventDescription || "No description available."}</div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="w-full flex  sm:px-2">
              <div className="bg-white rounded-2xl w-full h-full px-2 py-2">
                <div className="font-semibold text-lg flex flex-col gap-2">More Details</div>
                {/* You can add additional content here */}{eventData.AdditionalInfo}
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default EventInfo;
