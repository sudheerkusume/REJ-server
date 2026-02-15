// require("./db");
// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const app = express();
// app.use(express.json());
// app.use(cors());
// const auth = require("./routes/auth")
// const userAuth = require("./middleware/userAuth")
// const USER_SECRET = "jsonSecret";

// // -----------Models-----------
// const Enquiry = require("./model/EnquiryModel");
// const JobCategory = require("./model/JobModel");
// const Company = require("./model/CompanyModel");
// const Service = require("./model/ServiceModel");
// const Certification = require("./model/CertificationModel");
// const usersModel = require("./model/UserModel");
// const upload = require("./middleware/upload");
// const ClientUser = require("./model/ClientUserModel");
// const userAuth = require("./middleware/userAuth");



// // --------------Client User Routes--------------
// app.post("/users/signup", async (req, res) => {
//     try {
//         const { name, email, password, cpassword } = req.body;

//         if (password !== cpassword) {
//             return res.status(400).json({ message: "Passwords do not match" });
//         }

//         const exist = await ClientUser.findOne({ email });
//         if (exist) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const user = new ClientUser({ name, email, password });
//         await user.save();

//         res.status(201).json({ message: "User signup successful" });
//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// });


// app.post("/users/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await ClientUser.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         if (user.password !== password) {
//             return res.status(401).json({ message: "Invalid password" });
//         }

//         const token = jwt.sign(
//             { id: user._id, role: "user" },
//             USER_SECRET,
//             { expiresIn: "7d" }
//         );

//         res.json({
//             message: "User login successful",
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.post("/apply-job", userAuth, (req, res) => {
//     res.json({
//         message: "Job applied successfully",
//         userId: req.user.id
//     });
// });

// //---------------user image--------
// app.use("/uploads", express.static("uploads"));

// //-------------signup---------------
// app.post("/signup", upload.single("profileImage"), async (req, res) => {
//     const { email, password, cpassword } = req.body;

//     const exist = await usersModel.findOne({ email });
//     if (exist) return res.status(400).json({ message: "User exists" });

//     if (password !== cpassword)
//         return res.status(400).json({ message: "Passwords do not match" });

//     const user = new usersModel({
//         ...req.body,
//         profileImage: req.file
//             ? `/uploads/profile/${req.file.filename}`
//             : ""
//     });

//     await user.save();

//     res.json({
//         message: "User registered successfully",
//         user
//     });
// });//Ulogin---------
// app.post('/Ulogin', async (req, res) => {
//     const { email, password } = req.body;
//     const exists = await usersModel.findOne({ email: email })
//     if (!exists) {
//         return res.status(400).json({ message: "User does not exist" })
//     }
//     //password match
//     if (exists.password !== password) {
//         return res.status(400).json({ message: "Invalid password" })
//     }

//     //payload
//     const payload = {
//         user: {
//             id: exists._id,
//         }
//     }

//     //jwt creation
//     const token = jwt.sign(payload, "jsonSecret", { expiresIn: "1h" })
//     res.json({ message: "User logged in successfully", token: token })
// })

// //protected
// app.get("/dashboard", auth, async (req, res) => {
//     const user = await usersModel.findById(req.userId).select("-password")
//     res.json(user);
// })
// // -----------Enquiry Routes-----------
// app.post('/enquiries', async (req, res) => {
//     const enquiry = new Enquiry(req.body)
//     const result = await enquiry.save()
//     res.send(result)
// })

// app.get('/enquiries', async (req, res) => {
//     const enquiries = await Enquiry.find()
//     if (enquiries.length > 0) {
//         res.send(enquiries)
//     } else {
//         res.send("No Enquiries Found")
//     }
// })

// app.get('/enquiries/:_id', async (req, res) => {
//     const { _id } = req.params;

//     if (!_id) {
//         return res.status(400).json({ message: "Invalid ID" })
//     }
//     const enquiry = await Enquiry.findById(_id);
//     res.json(enquiry);
// })

// app.put('/enquiries/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const enquiry = await Enquiry.updateOne({ _id: _id }, { $set: req.body })
//     res.send(enquiry)
// })


// app.delete('/enquiries/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const enquiry = await Enquiry.deleteOne({ _id: _id })
//     res.send(enquiry)
// })

// // -----------Job Category Routes-----------

// app.post('/jobCategories', async (req, res) => {
//     const jobCategories = new JobCategory(req.body)
//     const result = await jobCategories.save()
//     res.send(result)
// })

// app.get('/jobCategories', async (req, res) => {
//     const jobs = await JobCategory.find();
//     if (jobs.length > 0) {
//         res.send(jobs)
//     } else {
//         res.send("No Job Categories Found")
//     }
// })

// app.get('/jobCategories/:_id', async (req, res) => {
//     const { _id } = req.params;

//     if (!_id) {
//         return res.status(400).json({ message: "Invalid ID" })
//     }
//     const job = await JobCategory.findById(_id);
//     res.json(job);
// })

// app.put('/jobCategories/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const job = await JobCategory.updateOne({ _id: _id }, { $set: req.body })
//     res.send(job)
// })

// app.delete('/jobCategories/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const job = await JobCategory.deleteOne({ _id: _id })
//     res.send(job)
// })

// // -----------Company Routes-----------

// app.post('/companies', async (req, res) => {
//     const company = new Company(req.body)
//     const result = await company.save()
//     res.send(result)
// })

// app.get('/companies', async (req, res) => {
//     const companies = await Company.find()
//     if (companies.length > 0) {
//         res.send(companies)
//     } else {
//         res.send("No Companies Found")
//     }
// })

// app.get('/companies/:_id', async (req, res) => {
//     const { _id } = req.params;

//     if (!_id) {
//         return res.status(400).json({ message: "Invalid ID" })
//     }
//     const company = await Company.findById(_id);
//     res.json(company);
// })

// app.put('/companies/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const company = await Company.updateOne({ _id: _id }, { $set: req.body })
//     res.send(company)
// })

// app.delete('/companies/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const company = await Company.deleteOne({ _id: _id })
//     res.send(company)
// })

// // -----------Service Routes-----------

// app.post('/services', async (req, res) => {
//     const service = new Service(req.body)
//     const result = await service.save()
//     res.send(result)
// })

// app.get('/services', async (req, res) => {
//     const services = await Service.find()
//     if (services.length > 0) {
//         res.send(services)
//     } else {
//         res.send("No Services Found")
//     }
// })

// app.get('/services/:_id', async (req, res) => {
//     const { _id } = req.params;

//     if (!_id) {
//         return res.status(400).json({ message: "Invalid ID" })
//     }
//     const service = await Service.findById(_id);
//     res.json(service);
// })

// app.put('/services/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const service = await Service.updateOne({ _id: _id }, { $set: req.body })
//     res.send(service)
// })

// app.delete('/services/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const service = await Service.deleteOne({ _id: _id })
//     res.send(service)
// })

// // -----------Certification Routes-----------

// app.post('/certifications', async (req, res) => {
//     const certification = new Certification(req.body)
//     const result = await certification.save()
//     res.send(result)
// })

// app.get('/certifications', async (req, res) => {
//     const certifications = await Certification.find()
//     if (certifications.length > 0) {
//         res.send(certifications)
//     } else {
//         res.send("No Certifications Found")
//     }
// })

// app.get('/certifications/:_id', async (req, res) => {
//     const { _id } = req.params;

//     if (!_id) {
//         return res.status(400).json({ message: "Invalid ID" })
//     }
//     const certification = await Certification.findById(_id);
//     res.json(certification);
// })

// app.put('/certifications/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const certification = await Certification.updateOne({ _id: _id }, { $set: req.body })
//     res.send(certification)
// })

// app.delete('/certifications/:_id', async (req, res) => {
//     const _id = req.params._id;
//     const certification = await Certification.deleteOne({ _id: _id })
//     res.send(certification)
// })


// app.listen(5000, () => console.log('API Started on port 5000'))

require("./db");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Project = require("./model/ProjectModel");
const upload = require("./middleware/upload");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));



// // -----------Models-----------
const Enquiry = require("./model/EnquiryModel");
const JobCategory = require("./model/JobModel");
const Company = require("./model/CompanyModel");
const Service = require("./model/ServiceModel");
const Certification = require("./model/CertificationModel");
const usersModel = require("./model/UserModel");
const JobApplication = require("./model/JobApplicationModel");
const auth = require("./middleware/auth");
const SavedJob = require("./model/SaveJobModel");
const Recruiter = require("./model/RecruiterModel");
const bcrypt = require("bcrypt");
// middleware
const adminAuth = require("./middleware/adminAuth");
const userAuth = require("./middleware/userAuth");
const recruiterRoutes = require("./routes/recruiterRoutes");
// 🔐 Secrets
const ADMIN_SECRET = "adminSecret123";
const USER_SECRET = "userSecret123";
const RECRUITER_SECRET = "recruiterSecret123";
const jobApplyRoutes = require("./routes/jobApply");
const applicationStatusRoutes = require("./routes/applicationStatus");
const sendMail = require("./mailer");


app.use("/", require("./routes/adminApplications"))
app.use("/", require("./routes/savedJobs"))
// app.use("/", require("./routes/recruiterApplication"))
app.use("/recruiter", recruiterRoutes)
app.use("/recruiter", require("./routes/recruiterApplication"))
app.use("/recruiter", require("./routes/recruiterProfile"))
app.use("/", applicationStatusRoutes)

app.use("/", jobApplyRoutes)






//  Project Form 
app.post("/projects", upload.any(), async (req, res) => {
    try {
        console.log("--- Project Upload Started ---");
        const projectData = { ...req.body };

        // Parse JSON fields if they are strings (robust parsing)
        const jsonFields = ["faqs", "amenities", "connectivity"];
        jsonFields.forEach(field => {
            if (projectData[field]) {
                try {
                    if (typeof projectData[field] === "string") {
                        projectData[field] = JSON.parse(projectData[field]);
                    }
                } catch (e) {
                    console.error(`Error parsing ${field}:`, e);
                    projectData[field] = []; // Fallback to empty array
                }
            }
        });

        // Process Files Dynamically
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const fieldName = file.fieldname;
                const fileUrl = file.path; // 🌍 CLOUDINARY URL

                if (["heroVideo", "amenitiesBackground", "brochure"].includes(fieldName)) {
                    projectData[fieldName] = fileUrl;
                } else {
                    if (!projectData[fieldName]) projectData[fieldName] = [];
                    projectData[fieldName].push(fileUrl);
                }
            });
        }

        console.log("Processed Project Data:", JSON.stringify(projectData, null, 2));

        const project = new Project(projectData);
        await project.save();

        res.status(201).json({ message: "Project added successfully", project });

    } catch (error) {
        console.error("Project Upload Error Details:", error);
        res.status(500).json({
            message: "Error adding project",
            error: error.message,
            stack: error.stack
        });
    }
});

app.get("/projects", async (req, res) => {
    const projects = await Project.find().populate("companyId", "name logo");
    res.json(projects);
});


app.get("/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id)
        .populate("companyId", "name logo");
    res.json(project);
});

app.get("/projects/company/:companyId", async (req, res) => {
    try {
        const projects = await Project.find({
            companyId: new mongoose.Types.ObjectId(req.params.companyId)
        }).populate("companyId", "name logo");

        res.json(projects);
    } catch (err) {
        console.error("Company Project Fetch Error:", err); // 👈 ADD THIS
        res.status(500).json({ message: "Error fetching company projects" });
    }
});

app.get("/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id)
        .populate("companyId", "name logo");
    res.json(project);
});


// ----------------------------------

app.get("/test-mail", async (req, res) => {
    const success = await sendMail({
        to: "yourreceiveremail@gmail.com",
        subject: "Test Email",
        text: "Mail test",
        html: "<h2>Email working ✅</h2>",
    });

    if (success) {
        res.json({ message: "Mail sent successfully" });
    } else {
        res.status(500).json({ message: "Mail failed" });
    }
});



app.get("/admin/dashboard-stats", adminAuth, async (req, res) => {
    try {
        const total = await JobApplication.countDocuments();
        const shortlisted = await JobApplication.countDocuments({ status: "Shortlisted" });
        const selected = await JobApplication.countDocuments({ status: "Selected" });
        const rejected = await JobApplication.countDocuments({ status: "Rejected" });

        res.json({
            total,
            shortlisted,
            selected,
            rejected
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to load dashboard stats" });
    }
});


app.get("/my-applications", userAuth, async (req, res) => {
    const applications = await JobApplication.find({
        userId: req.userId
    })
        .populate("jobId", "title location type experience")
        .populate("companyId", "name logo");

    res.json(applications);
});

app.delete("/my-applications/:id", userAuth, async (req, res) => {
    try {
        const application = await JobApplication.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        await JobApplication.deleteOne({ _id: req.params.id });

        res.json({ message: "Application withdrawn successfully" });
    } catch (err) {
        console.error("Delete application error:", err);
        res.status(500).json({ message: "Failed to withdraw application" });
    }
});


// ---------------------RECRUITER AUTH---------------------

app.post("/admin/create-recruiter", adminAuth, async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            department,
            password,
            permissions
        } = req.body;

        const exist = await Recruiter.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "Recruiter already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const recruiter = new Recruiter({
            name,
            email,
            phone,
            department,
            password: hashedPassword,
            permissions,
        });

        await recruiter.save();

        res.status(201).json({
            message: "Recruiter created successfully"
        });

    } catch (err) {
        console.error("CREATE RECRUITER ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ---------------------RECRUITER AUTH---------------------

app.post("/recruiter/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const recruiter = await Recruiter.findOne({ email });

        if (!recruiter) {
            return res.status(400).json({ message: "Recruiter not found" });
        }

        const isMatch = await bcrypt.compare(password, recruiter.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: recruiter._id, role: "recruiter" },
            "recruiterSecret123",
            { expiresIn: "2d" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------jobApply Routes---------
// app.use("/", require("./routes/jobApply"))
/* ================= ADMIN AUTH ================= */

// 🔹 Admin Signup
app.post("/signup", async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;

        if (password !== cpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const exist = await usersModel.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const admin = new usersModel({
            name: "Admin",
            email,
            password,
            role: "admin"
        });

        await admin.save();
        res.json({ message: "Admin registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Admin Login
// app.post("/Ulogin", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const admin = await usersModel.findOne({ email, role: "admin" });
//         if (!admin) {
//             return res.status(400).json({ message: "Admin not found" });
//         }

//         if (admin.password !== password) {
//             return res.status(400).json({ message: "Invalid password" });
//         }

//         const token = jwt.sign(
//             { id: admin._id, role: "admin" },
//             ADMIN_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.json({ token });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
app.post("/Ulogin", async (req, res) => {
    const { email, password } = req.body;

    const admin = await usersModel.findOne({ email, role: "admin" });
    if (!admin) {
        return res.status(400).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: admin._id, role: "admin" },
        "adminSecret123",
        { expiresIn: "1d" }
    );

    res.json({ token });
});


// 🔹 Admin Dashboard (Protected)
app.get("/dashboard", adminAuth, async (req, res) => {
    const admin = await usersModel.findById(req.userId).select("-password");
    res.json(admin);
});

/* ================= USER AUTH ================= */

// 🔹 User Signup
app.post("/users/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const exist = await usersModel.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new usersModel({
            name,
            email,
            password,
            role: "user"
        });

        await user.save();
        res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 User Login
app.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usersModel.findOne({ email, role: "user" });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, role: "user" },
            USER_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 User Protected Route Example
app.get("/user/profile", userAuth, async (req, res) => {
    const user = await usersModel.findById(req.userId).select("-password");
    res.json(user);
});


// --------------------Enpoints--------------
// // -----------Enquiry Routes-----------
app.post('/enquiries', async (req, res) => {
    const enquiry = new Enquiry(req.body)
    const result = await enquiry.save()
    res.send(result)
})

app.get('/enquiries', async (req, res) => {
    const enquiries = await Enquiry.find()
    if (enquiries.length > 0) {
        res.send(enquiries)
    } else {
        res.send("No Enquiries Found")
    }
})

app.get('/enquiries/:_id', async (req, res) => {
    const { _id } = req.params;

    if (!_id) {
        return res.status(400).json({ message: "Invalid ID" })
    }
    const enquiry = await Enquiry.findById(_id);
    res.json(enquiry);
})

app.put('/enquiries/:_id', async (req, res) => {
    const _id = req.params._id;
    const enquiry = await Enquiry.updateOne({ _id: _id }, { $set: req.body })
    res.send(enquiry)
})


app.delete('/enquiries/:_id', async (req, res) => {
    const _id = req.params._id;
    const enquiry = await Enquiry.deleteOne({ _id: _id })
    res.send(enquiry)
})

// -----------Job Category Routes-----------

// app.post('/jobCategories', async (req, res) => {
//     const jobCategories = new JobCategory(req.body)
//     const result = await jobCategories.save()
//     res.send(result)
// })

app.post('/jobCategories', async (req, res) => {
    try {
        const jobCategories = new JobCategory(req.body);
        const result = await jobCategories.save();
        res.status(201).json(result);
    } catch (error) {
        console.error("JobCategory create error:", error.message);
        res.status(400).json({
            message: "Invalid job category data",
            error: error.message
        });
    }
});

app.get('/jobCategories', async (req, res) => {
    const jobs = await JobCategory.find();
    if (jobs.length > 0) {
        res.send(jobs)
    } else {
        res.send("No Job Categories Found")
    }
})

app.get('/jobCategories/:_id', async (req, res) => {
    const { _id } = req.params;

    if (!_id) {
        return res.status(400).json({ message: "Invalid ID" })
    }
    const job = await JobCategory.findById(_id);
    res.json(job);
})

app.put('/jobCategories/:_id', async (req, res) => {
    const _id = req.params._id;
    const job = await JobCategory.updateOne({ _id: _id }, { $set: req.body })
    res.send(job)
})

app.delete('/jobCategories/:_id', async (req, res) => {
    const _id = req.params._id;
    const job = await JobCategory.deleteOne({ _id: _id })
    res.send(job)
})

// -----------Company Routes-----------

app.post('/companies', async (req, res) => {
    const company = new Company(req.body)
    const result = await company.save()
    res.send(result)
})

app.get('/companies', async (req, res) => {
    const companies = await Company.find()
    if (companies.length > 0) {
        res.send(companies)
    } else {
        res.send("No Companies Found")
    }
})

app.get('/companies/:_id', async (req, res) => {
    const { _id } = req.params;

    if (!_id) {
        return res.status(400).json({ message: "Invalid ID" })
    }
    const company = await Company.findById(_id);
    res.json(company);
})

app.put('/companies/:_id', async (req, res) => {
    const _id = req.params._id;
    const company = await Company.updateOne({ _id: _id }, { $set: req.body })
    res.send(company)
})

app.delete('/companies/:_id', async (req, res) => {
    const _id = req.params._id;
    const company = await Company.deleteOne({ _id: _id })
    res.send(company)
})

// -----------Service Routes-----------

app.post('/services', async (req, res) => {
    const service = new Service(req.body)
    const result = await service.save()
    res.send(result)
})

app.get('/services', async (req, res) => {
    const services = await Service.find()
    if (services.length > 0) {
        res.send(services)
    } else {
        res.send("No Services Found")
    }
})

app.get('/services/:_id', async (req, res) => {
    const { _id } = req.params;

    if (!_id) {
        return res.status(400).json({ message: "Invalid ID" })
    }
    const service = await Service.findById(_id);
    res.json(service);
})

app.put('/services/:_id', async (req, res) => {
    const _id = req.params._id;
    const service = await Service.updateOne({ _id: _id }, { $set: req.body })
    res.send(service)
})

app.delete('/services/:_id', async (req, res) => {
    const _id = req.params._id;
    const service = await Service.deleteOne({ _id: _id })
    res.send(service)
})

// -----------Certification Routes-----------

app.post('/certifications', async (req, res) => {
    const certification = new Certification(req.body)
    const result = await certification.save()
    res.send(result)
})

app.get('/certifications', async (req, res) => {
    const certifications = await Certification.find()
    if (certifications.length > 0) {
        res.send(certifications)
    } else {
        res.send("No Certifications Found")
    }
})

app.get('/certifications/:_id', async (req, res) => {
    const { _id } = req.params;

    if (!_id) {
        return res.status(400).json({ message: "Invalid ID" })
    }
    const certification = await Certification.findById(_id);
    res.json(certification);
})

app.put('/certifications/:_id', async (req, res) => {
    const _id = req.params._id;
    const certification = await Certification.updateOne({ _id: _id }, { $set: req.body })
    res.send(certification)
})

app.delete('/certifications/:_id', async (req, res) => {
    const _id = req.params._id;
    const certification = await Certification.deleteOne({ _id: _id })
    res.send(certification)
})


/* ================= SERVER ================= */

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
