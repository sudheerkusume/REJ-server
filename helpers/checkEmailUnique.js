const User = require("../model/UserModel");
const Recruiter = require("../model/RecruiterModel");
const Company = require("../model/CompanyModel");

const checkEmailUnique = async (email) => {
    const [user, recruiter, company] = await Promise.all([
        User.findOne({ email }),
        Recruiter.findOne({ email }),
        Company.findOne({ email }),
    ]);

    if (user) return { exists: true, table: "User" };
    if (recruiter) return { exists: true, table: "Recruiter" };
    if (company) return { exists: true, table: "Company" };

    return { exists: false, table: null };
};

module.exports = checkEmailUnique;
