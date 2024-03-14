//  IMPORTS ---------------
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/JobModel.js";
import User from "./models/UserModel.js";

// POPULATE DATA testuser: test@test.com | admin: default-email@email.com
try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "default-email@email.com" });
  //   read dummy data
  const jsonJobs = JSON.parse(
    await readFile(new URL("./uitls/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((jobs) => {
    return { ...jobs, createdBy: user._id };
  });

  // remove previously existing data before populating
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("populate data successful");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}

// POPULATE ADMIN DATA default-email@email.com
try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({
    email: "default-email@email.com",
  });
  //   read dummy data
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((jobs) => {
    return { ...jobs, createdBy: user._id };
  });

  // remove previously existing data before populating
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("populate data successful");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
