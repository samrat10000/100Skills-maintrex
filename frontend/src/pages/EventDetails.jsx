import React, { useEffect, useState } from 'react'
import EventInfo from '../components/EventInfo'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from "../api/axios"

const EventDetails = () => {

  const { id } = useParams();
  const [eventData, setEventData] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [ClubId, setClubId] = useState("")
  
   useEffect(() => {
    window.scrollTo(0, 0); // 👈 this forces scroll to top when component loads
  }, []);

  useEffect(() => {
    const getDataById = async () => {
      try {
        const response = await api.get(`/events/get/${id}`);
        setEventData(response.data);
        setClubId(response.data.club);
  
      } catch (error) {
    
        alert("Error fetching the event");
      }
    };
    getDataById();
  }, [id]);

    useEffect(() => {
    const fetchClubImage = async () => {
      try {
        const response = await api.get(`/getClubImageById/${ClubId}`);
        setImageUrl(response.data.clubProfileImg);
        
        
      } catch (err) {
        setError('Failed to fetch club image');
       
      }
    };

    if (ClubId) {
      fetchClubImage();
    }
  }, [ClubId]);


  return (
    <div>
      <EventInfo eventData ={eventData} imageUrl={imageUrl}/>
     {/* <img src={imageUrl} alt="" /> */}
    </div>
  )
}

export default EventDetails;
