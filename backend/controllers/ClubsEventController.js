import Event from "../models/Event.js";
import ClubAdmin from "../models/ClubAdmin.js";

export const getClubsEvents = async (req, res) => {
  try {
    const clubId = req.club.id;

    // const clubsEvents = await Event.find({club:clubId})
    // const clubsEvents = await Event.find({ clubId }).populate('clubId');
    const clubsEvents = await Event.find({ club: clubId });

    res.json(clubsEvents);
  } catch (error) {
    res.status(500).json({ message: " error fetching clubs event" });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      eventImage,
      eventName,
      location,
      registrationStartDate,
      registrationEndDate,
      eventDate,
      registerLink,
      mode,
      paymentType,
      eventType,
      eventDescription,
      AdditionalInfo,
    } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        eventImage,
        eventName,
        location,
        registrationStartDate,
        registrationEndDate,
        eventDate,
        registerLink,
        mode,
        paymentType,
        eventType,
        eventDescription,
        AdditionalInfo,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteById = await Event.findByIdAndDelete(id);

    if (!deleteById) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully", deleteById });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const updateClubName = async (req , res) =>{
//     try {

//     } catch (error) {

//     }
// }

export const getProfileData = async (req, res) => {
  try {
    const clubId = req.club?.id || req.user?.id;

    if (!clubId) {
      return res.status(400).json({ message: "Club ID not found in token" });
    }

    const clubData = await ClubAdmin.findById(clubId);

    if (!clubData) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({ club: clubData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editProfileData = async (req, res) => {
  try {
    const clubId = req.club?.id || req.user?.id;

    if (!clubId) {
      return res.status(400).json({ message: "Club ID not found in token" });
    }

    const { clubName, clubProfileImg } = req.body;

    const updatedClub = await ClubAdmin.findByIdAndUpdate(
      clubId,
      {
        ...(clubName && { clubName }),
        ...(clubProfileImg && { clubProfileImg }),
      },
      { new: true }
    );

    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      club: updatedClub,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Backend Controller
export const updateClubProfileImage = async (req, res) => {
  try {
    const clubId = req.club?.id || req.user?.id; // assuming token gives you user/club id
    const { clubProfileImg } = req.body;

    const updatedClub = await ClubAdmin.findByIdAndUpdate(
      clubId,
      { clubProfileImg },
      { new: true }
    );

    if (!updatedClub) return res.status(404).json({ error: "Club not found" });

    res.status(200).json({ message: "Profile image updated", updatedClub });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getClubImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await ClubAdmin.findById(id).select("clubProfileImg"); // only fetch the image field

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({ clubProfileImg: club.clubProfileImg });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
