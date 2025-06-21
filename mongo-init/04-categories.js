'use strict';

const db = db.getSiblingDB('shakersdb');

if (!db.getCollectionNames().includes('categories')) {
    db.createCollection('categories');
}

const categories = [
    {"_id": 1, "name": "Software Development"},
    {"_id": 2, "name": "Data & Analytics"},
    {"_id": 3, "name": "Cloud & Infrastructure"},
    {"_id": 4, "name": "Artificial Intelligence & Machine Learning"},
    {"_id": 5, "name": "Cybersecurity"},
    {"_id": 6, "name": "Product & Project Management"},
    {"_id": 7, "name": "Design & UX"},
    {"_id": 8, "name": "Quality Assurance & Testing"},
    {"_id": 9, "name": "DevOps & SRE"},
    {"_id": 10, "name": "IT Support & Operations"},
    {"_id": 11, "name": "Networking"},
    {"_id": 12, "name": "Database Management"},
    {"_id": 13, "name": "Emerging Technologies"},
    {"_id": 14, "name": "Enterprise Solutions"},
    {"_id": 15, "name": "Hardware & Devices"}
];

db.categories.insertMany(categories);
