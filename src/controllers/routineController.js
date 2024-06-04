import Routine from "../models/routine.js";

export const createRoutine = async (req, res) => {
  try {
    const userId = req.user.userId; 
    console.log(userId)
    const { name, description, activities, frequency, isActive } = req.body;

    const newRoutine = new Routine({
      user: userId,
      name,
      description,
      activities,
      frequency,
      isActive,
    });

    const savedRoutine = await newRoutine.save();
    res.status(201).json(savedRoutine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllRoutine = async (req, res) => {
  const userId = req.param.userId;
  console.log(req.body)
  
  try {
    const routines = await Routine.find({ user: userId });
    if (!routines || routines.length === 0) {
      return res.status(404).json({ message: 'No routines found for this user' });
    }
    res.status(200).json(routines);
  } catch (error) {
    console.error("Error fetching routines:", error);
    res.status(500).json({ message: "Server error" });
  }
};


