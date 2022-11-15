import IEmployeeInfo from "../models/employeeInfo.js";

//GET ALL
export const getAllEmployeeInfo = async (req, res) => {
  try {
    const listEmployeeInfo = await IEmployeeInfo.find();

    res.status(200).json(listEmployeeInfo);
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

//CREATE 
export const createEmployeeInfo = async (req, res) => {
  try {
    const {
      career: { careerName, icon, total },
    } = req.body;
    const newEmloyeeInfo = new IEmployeeInfo({
      career: { careerName, icon, total },
    });

    await newEmloyeeInfo.save();
    res.json({ msg: "Created a employee infomation!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//DELETE 
export const deleteEmployeeInfo = async (req, res) => {
  try {
    await IEmployeeInfo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a employee infomation!" });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};

//UPDATE 
export const updateEmployeeInfo = async (req, res) => {
  try {
    const {
      career: { careerName, icon, total },
    } = req.body;

    await IEmployeeInfo.findOneAndUpdate(
      { _id: req.params.id },
      {
        career: { careerName, icon, total },
      }
    );

    res.json({ msg: "Updated a employee infomation!" });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};