var faker = require('faker');

const userProfile  = function(p1,p2)
{
    let degree = ['Master Of Science','Bachelor Of Science','BE','BTEHC','BSC','MSC','MCOM','MBBS'];
    let field = ['Software Engg','Computer Engineering','Computer Science','Electrical enginnering','IT','Mechanical','Production Enggineering'];
    let course = ["CMPE202, CMPE272, CMPE273","CMPE206, CMPE207, CMPE202","CMPE281, CMPE283, CMPE272","CMPE202, CMPE285, CMPE287"]
    let skills = ['Web Development','Responsive Web Design','Mobile Applications','Programming','Wireframing','Tools & Technologies','Cascading Style Sheets (CSS)','Java','SQL','Microsoft Office','React.js','Redux.js','SASS','MySQL','MongoDB','PHP','XML','JSON','Adobe Photoshop','Bootstrap','HTML5','CSS','HTML'];
    
    
    let r1 = Math.floor(Math.random() * (5)) + 1;
    let a1 = [];
    let a2 = [];
    let a3 = [];
    for(var i = 0 ; i < r1 ; i++)
    {
        a1.push({
            "title": faker.name.jobTitle(),
            "company": faker.company.companyName(),
            "location": faker.name.jobArea(),
            "headline": faker.commerce.department(),//
            "description": faker.name.jobDescriptor(),
            "date": {
                "startdate": faker.date.past(),
                "enddate": faker.date.future()
            }
        });

        a2.push({
            "school": faker.company.companyName(),
            "degree": degree[Math.floor(Math.random()*degree.length)],
            "field": field[Math.floor(Math.random()*field.length)],
            "grade": course[Math.floor(Math.random()*course.length)],
            "description": faker.lorem.paragraph(),
            "date": {
                "startdate": faker.date.past(),
                "enddate": faker.date.future()
            }
        });

        a3.push(skills[Math.floor(Math.random()*skills.length)])
    }

    const tempuser = {
        "name": {
            "first": p1 ,
            "last": p2,
        },
        "address": {
                "street": faker.address.streetName(),
                "city": faker.address.city(),
                "country": faker.address.country(),
                "zipcode": (Math.floor(Math.random()*90000) + 10000),
                "coordinates": {
                    "latitude": faker.address.latitude(),
                    "longitude": faker.address.longitude()
                }
        },
        "experience": a1,
        "education": a2,
        "skills": a3,
        "summary": "Software Engg student",
        "resume": faker.image.imageUrl(),
        "profile_image": faker.image.imageUrl(),
        "banner_image": faker.image.imageUrl()
    }
    return tempuser;
}

module.exports = userProfile;