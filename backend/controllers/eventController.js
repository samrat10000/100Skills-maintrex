import Event from "../models/Event.js"

export const createEvent = async (req, res) => {
  try {
    const {
      eventImage, // This might just be a string (URL)
      eventName,
      location,
      registrationStartDate,
      registrationEndDate,
      eventDate,
      registerLink,
      mode,
      paymentType,
      eventDescription,
      AdditionalInfo,
      eventType,
    } = req.body;

    const clubId = req.club.id;

    // ✅ Step: Convert string to object if needed
    let image = eventImage;
    if (typeof eventImage === "string") {
      image = {
        public_id: "manual_" + Date.now(), // or generate your own ID
        url: eventImage
      };
    }

    const newEvent = new Event({
      eventImage: image,
      eventName,
      location,
      registrationStartDate,
      registrationEndDate,
      eventDate,
      registerLink,
      mode,
      paymentType,
      eventDescription,
      AdditionalInfo,
      eventType,
      club: clubId,
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event Created Successfully",
      event: newEvent
    });

  } catch (error) {

    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const getEventById = async(req,res)=>{
    try {
        const {id} = req.params;

        const event = await Event.findById(id);

        if (!event) {
        return res.status(404).json({ message: "Event not found" });

    }
    res.status(200).json(event);

    } catch (error) {

        res.status(500).json({ message: "Server error" });
    }
}




export const getAllEvent = async(req,res)=>{
    try {
        const allEvents = await Event.find();
        res.status(200).json(allEvents);
    } catch (error) {

        res.status(500).json({ message: "Error fetching events", error: error.message });
    }
}