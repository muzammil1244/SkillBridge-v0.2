import Job from "../models/Job.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../middleware/multersetup.js";

export const jobcreate = async (req, res) => {
  try {
    const {
      title,
      description,
      skill,
      budget,
      deadline,
      jobtype,
      salary,
      canapply,
      opportunity,
      active,
    } = req.body;
console.log("yes one")
    const parsedSkills = typeof skill === "string" ? JSON.parse(skill) : skill;
 let profileImage = null
      if(req.file){

     profileImage = req.file ? await uploadToCloudinary(req.file.buffer,"skillbridgev0.2"):"" ;

      }else{
        profileImage ="https://res.cloudinary.com/dkuqude1b/image/upload/v1776100523/Modern_geometric_logo_design_xqgq3b.png"
      }
      console.log("yes two")

    const jobdata = new Job({
      title,
      description,
      skill: parsedSkills,
      budget,
      deadline,
      createBy: req.user.userID,
      jobtype,
      salary,
      canapply,
      opportunity,
      active: active === "true",
      image:profileImage,
    });
console.log("yes three")

    await jobdata.save();
    console.log("yes four")

    res.status(200).send(jobdata);
  } catch (err) {
    console.error("Job create error:", err.message);
    res.status(500).send({ error: "Job creation failed", details: err.message });
  }
};



export const Applyjob = async (req, res) => {

  const identy = req.params.jobId

  const job = await Job.findById(identy)


  if (!job) {

    return res.status(500).send("job not found")
  }


  const { coverlater, status, rating } = req.body

  console.log("yes one")
let resume ;

  if(req.file){
   resume = req.file ? await uploadToCloudinary(req.file.buffer , "skillbridgev0.2",req.file.mimetype)  :"";
console.log(req.file.mimetype)

  }
  console.log("yes two")

  const alreadyApplied = job.applicants.find(
    (app) => app.freelancer.toString() === req.user.userID
  );
  if (alreadyApplied) {
    return res.status(400).send("You already applied to this job");
  }
  console.log("yes one")

  try {
    job.applicants.push({ freelancer: req.user.userID, resume, coverlater, status, rating })
    await job.save();
  console.log("yes one")

    res.status(200).send("application succesfully submited")

  } catch (error) {
    res.status(500).json(error)
  }

}

export const UpdateJob = async (req, res) => {
  try {
    const updateId = req.params.updateID;
    const userId = req.user.userID;

    const {
      title,
      description,
      budget,
      deadline,
      jobtype,
      salary,
      canapply,
      opportunity,
      active,
    } = req.body;

    const parsedSkills = JSON.parse(req.body.skill || "[]");

    const updatedFields = {
      title,
      description,
      skill: parsedSkills,
      budget,
      deadline,
      jobtype,
      salary,
      canapply,
      opportunity,
      active: active === "true",
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: updateId, createBy: userId },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).send("Job not found or unauthorized");
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Server error");
  }
};



export const getAppliedJobs = async (req, res) => {
  const freelancerId = req.user.userID;

  try {
    const appliedJobs = await Job.find({
      'applicants.freelancer': freelancerId
    })
      .populate('createBy', 'name email')            
      .populate('applicants.freelancer', 'name email')

    const result = appliedJobs.map(job => {
      const mine = job.applicants.find(a => a.freelancer._id.toString() === freelancerId);
      return {
        jobId: job._id,
        title: job.title,
        description: job.description,
        employer: job.createBy,
        application: {
          resume: mine.resume,
          coverlater: mine.coverlater,
          status: mine.status,
          appliedAt: mine.appliedAt
        }
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error('Error getting applied jobs:', err);
    res.status(500).send('Internal Server Error');
  }
};
export const Jobs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const job_name = req.query.job_name;
  const job_location = req.query.job_location;
  const job_salary = req.query.job_salary;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    // Filter object banao — sirf jo diya hai woh add karo
    const filter = {};

    if (job_name) {
      filter.title = { $regex: job_name, $options: "i" }; // case insensitive search
    }

    if (job_location) {
      filter.jobtype = { $regex: job_location, $options: "i" };
    }

    if (job_salary) {
      filter.budget = { $gte: parseInt(job_salary) }; // minimum salary
    }

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments(filter); // filter ke saath count karo
    const hasMore = page < Math.ceil(totalJobs / limit);

    return res.json({ jobs, hasMore });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



