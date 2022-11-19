import IEmployeeInfo from "../models/employeeInfo.js";

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    //console.log({ before: queryObj }); //before delete page

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    //console.log({ after: queryObj }); //after delete page

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    // gte = greater than or equal
    // lte = lesser than or equal
    // lt = lesser than
    // gt = greater than
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

//GET ALL
export const getAllEmployeeInfo = async (req, res) => {
  try {
    const listEmployeeInfo = await IEmployeeInfo.find();

    res.status(200).json(listEmployeeInfo);
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

//GET BY ID
export const getInfoById = async (req, res) => {
  const username = req.params.username;

  let info;
  try {
    info = await IEmployeeInfo.findOne({username: username});
  } catch {
    return res
      .status(400)
      .json({ errorMessage: "Some thing went wrong, please try again" });
  }

  if (!info) {
    return res
      .status(401)
      .json({ errorMessage: "Can not find this infomation, please try again" });
  }
  res.json({ info: info.toObject({ getters: true }) });
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