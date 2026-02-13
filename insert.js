const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017/";

MongoClient.connect(url)
    .then((conn) => {
        const db = conn.db('realestate');
        const collection = db.collection('certifications');
        const data = [
            {
                "id": "1",
                "title": "Certified Real Estate Sales Professional (CRESP)",
                "category": "Sales & Marketing",
                "level": "Beginner",
                "duration": "3 Months",
                "mode": "Online",
                "price": 7999,
                "rating": 4.6,
                "description": "Learn property sales, client handling, lead conversion, and closing techniques used by top real estate professionals.",
                "skillsCovered": [
                    "Property Sales",
                    "Client Negotiation",
                    "Lead Generation",
                    "CRM Usage"
                ],
                "certificationProvider": "RealEstateJobs Academy",
                "jobRoles": [
                    "Real Estate Sales Executive",
                    "Property Consultant",
                    "Channel Partner"
                ],
                "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            },
            {
                "id": "2",
                "title": "Real Estate Project Management Certification",
                "category": "Project Management",
                "level": "Intermediate",
                "duration": "4 Months",
                "mode": "Hybrid",
                "price": 11999,
                "rating": 4.7,
                "description": "Master planning, execution, budgeting, and risk management for residential and commercial real estate projects.",
                "skillsCovered": [
                    "Project Planning",
                    "Construction Coordination",
                    "Budget Management",
                    "Risk Analysis"
                ],
                "certificationProvider": "RealEstateJobs Academy",
                "jobRoles": [
                    "Project Manager",
                    "Site Coordinator",
                    "Operations Manager"
                ],
                "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
            },
            {
                "id": "3",
                "title": "Property Valuation & Real Estate Finance Certification",
                "category": "Finance & Valuation",
                "level": "Advanced",
                "duration": "3 Months",
                "mode": "Online",
                "price": 14999,
                "rating": 4.8,
                "description": "Understand property valuation, real estate finance, ROI analysis, and investment decision-making.",
                "skillsCovered": [
                    "Property Valuation",
                    "Real Estate Finance",
                    "ROI Calculation",
                    "Investment Analysis"
                ],
                "certificationProvider": "RealEstateJobs Academy",
                "jobRoles": [
                    "Property Valuation Analyst",
                    "Investment Consultant",
                    "Real Estate Financial Advisor"
                ],
                "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
            }

        ]
        collection.insertMany(data)
            .then(() => console.log('data inseerted'))
            .catch((err) => console.log(err))
            .finally(() => conn.close());
    })
    .catch((err) => {
        console.log(err);
    }) 