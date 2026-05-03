require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Courses = require("./postgreConnection");

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Courses.query(`delete from courses`);

        const courses = [
            { code: "CSC1015F", name: "Computational Thinking", faculty: "science", year: 1 },
            { code: "CSC1016S", name: "Algorithms and Data Structures", faculty: "science", year: 1 },
            { code: "MAM1000W", name: "Mathematics", faculty: "science", year: 1 },
            { code: "PHY1004W", name: "Physics", faculty: "science", year: 1 },
            { code: "BIO1004F", name: "Cell Biology", faculty: "science", year: 1 },
            { code: "CHE1007F", name: "Chemistry", faculty: "science", year: 1 },
            { code: "ECO1010F", name: "Microeconomics", faculty: "commerce", year: 1 },
            { code: "ACC1006F", name: "Accounting", faculty: "commerce", year: 1 },
            { code: "LAW1010F", name: "Introduction to Law", faculty: "law", year: 1 },
            { code: "MED1000F", name: "Medicine Foundation", faculty: "health sciences", year: 1 },
        ];

        for (const course of courses) {
            await Courses.query(`insert into courses (code,name, faculty, year) values($1, $2, $3, $4)`,
                [course.code, course.name, course.faculty, course.year]);
        }

        console.log("Courses seeded");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

void seedCourses();