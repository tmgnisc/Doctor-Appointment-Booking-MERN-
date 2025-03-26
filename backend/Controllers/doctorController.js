import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id,);
    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id,).select("-password");
    res.status(200).json({
      success: true,
      message: "user found",
      data: doctor, 
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "no user found" });
  }
};


export const getAllDoctor = async (req, res) => {

    try {
      const doctors = await Doctor.find({}).select("-password");
      res.status(200).json({
        success: true,
        message: "users found",
        data: doctors, 
      });
    } catch (err) {
      res.status(404).json({ success: false, message: "not found" });
    }
  };