import React, { useState } from "react";
import axios from "axios";


const CreateEvent = () => {

  const REACT_APP_CLOUDINARY_CLOUD_NAME = "dkhgb2u6f";
  const REACT_APP_CLOUDINARY_API_KEY ="145134119951375"


  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    registrationStartDate: "",
    registrationEndDate: "",
    eventDate: "",
    registerLink: "",
    mode:"",
    paymentType:"",
  });

  const [eventImage, setEventImage] = useState(null);
  const [clubImage, setClubImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name] : e.target.value });
  };

  
  const uploadToCloudinary = async (file) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/cloudinary/signature");
      const { signature, timestamp } = data;

      const cloudName = REACT_APP_CLOUDINARY_CLOUD_NAME;
      const apiKey = REACT_APP_CLOUDINARY_API_KEY;

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("api_key", apiKey);
      uploadData.append("timestamp", timestamp);
      uploadData.append("signature", signature);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        uploadData
      );

      return res.data.secure_url;
      
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventImageUrl = await uploadToCloudinary(eventImage);
      const clubImageUrl = clubImage ? await uploadToCloudinary(clubImage) : "";

      const payload = {
        ...formData,
        eventImage: eventImageUrl,
        clubImage: clubImageUrl,
      };

      await axios.post("http://localhost:5000/api/events/create", payload);

      alert("Event created successfully!");
      setFormData({
        eventName: "",
        location: "",
        registrationStartDate: "",
        registrationEndDate: "",
        eventDate: "",
        registerLink: "",
        mode,
        paymentType,
      });
      setEventImage(null);
      setClubImage(null);
    } catch (err) {
      console.error("Error submitting event:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }} >
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} required /><br /><br />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required /><br /><br />
        <input type="url" name="registerLink" placeholder="Registration Link" value={formData.registerLink} onChange={handleChange} required /><br /><br />

        <label>Registration Start Date:</label><br />
        <input type="date" name="registrationStartDate" value={formData.registrationStartDate} onChange={handleChange} required /><br /><br />
        <label>Registration End Date:</label><br />
        <input type="date" name="registrationEndDate" value={formData.registrationEndDate} onChange={handleChange} required /><br /><br />
        <label>Event Date:</label><br />
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required /><br /><br />

        <label>Event Image:</label><br />
        <input type="file" accept="image/*" onChange={(e) => setEventImage(e.target .files[0])} required /><br /><br />
        <label>Club Image (optional):</label><br />
        <input type="file" accept="image/*" onChange={(e) => setClubImage(e.target.files[0])} /><br /><br />


 <label>MODE</label><br />
        <select id="mode" name="mode"  value={formData.mode} onChange={handleChange} required >
           <option value="">Select mode</option>
  <option value="online">online</option>
  <option value="offline">offline</option>
</select>
         
         
         <label>PpymentType</label><br />
        {/* <input type="date" name="eventDate" value={formData.paymentType} onChange={handleChange} required /><br /><br /> */}
          <select id="paymentType" name="paymentType"  value={formData.paymentType} onChange={handleChange} required >
           <option value="">Select type</option>
  <option value="Free">Free</option>
  <option value="Paid">Paid</option>
</select>
         
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
