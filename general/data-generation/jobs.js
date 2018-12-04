var faker = require('faker');

const jobs  = function(p1,p2)
{
    let degree = ['Master Of Science','Bachelor Of Science','BE','BTEHC','BSC','MSC','MCOM','MBBS'];
    let choiceType = [true,false];
    let field = ['Software Engg','Computer Engineering','Computer Science','Electrical enginnering','IT','Mechanical','Production Enggineering'];
    let course = ["CMPE202, CMPE272, CMPE273","CMPE206, CMPE207, CMPE202","CMPE281, CMPE283, CMPE272","CMPE202, CMPE285, CMPE287"]
    let skills = ['Web Development','Responsive Web Design','Mobile Applications','Programming','Wireframing','Tools & Technologies','Cascading Style Sheets (CSS)','Java','SQL','Microsoft Office','React.js','Redux.js','SASS','MySQL','MongoDB','PHP','XML','JSON','Adobe Photoshop','Bootstrap','HTML5','CSS','HTML'];
    let jobdescription = ["Internship program is open to talended candidates in related discipline. If you are interested in building professional career then apply to Software Developer Intern. This position is open in San Jose, CA. Application deadline is approching soon.","As an intern, you'll be thrown in the deep end of the pool. You'll own a capstone project from start to finish and find the support of a a dedicated Mentor and a Program Manager. You'll also participate in dedicated leadership development curriculum and gain industry knowledge from top Twitch executives in dedicated fireside chats. Add to this cohort trips, service opportunities, resume workshops, and housing (yes housing!) and you've got a packed summer.","https://github.com/sourcegraph/careers/blob/master/job-descriptions/software-engineer-intern.md","Your goal – to improve the education process and better the lives of students by building revolutionary products that help students get better grades.","As a Software Engineering Intern with the Log Correlation Engine (LCE) team, you’ll be responsible for developing features related to the collection, aggregation, and correlation of logs from various network and security devices and applications. You’ll design and then implement new functionality for the LCE, and work with Quality Assurance Engineers to validate the new code. You may learn new processes, new tools, new debugging techniques, and we think you’ll have fun along the way, too!"];
    let jobtype = ['Full-Time','Part-Time','Internship','Contract Position'];
    
    let r1 = Math.floor(Math.random() * (8)) + 1;
    let a1 = [];
    let a2 = [];
    let a3 = [];
    for(var i = 0 ; i < r1 ; i++)
    {
        a3.push(skills[Math.floor(Math.random()*skills.length)])
    }

    const tempuser = {
        "title": faker.name.jobTitle(),
        "company": faker.company.companyName(),
        "description": jobdescription[Math.floor(Math.random()*jobdescription.length)],
        "industry": field[Math.floor(Math.random()*field.length)],
        "type": jobtype[Math.floor(Math.random()*jobtype.length)],
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
        "function": faker.name.jobDescriptor(),
        "company_logo": "https://www.cohnreznick.com/-/media/images/logos/cr_logo_animation.svg",
        "skills": a3,
        "easy_apply": choiceType[Math.floor(Math.random()*choiceType.length)]
    }
    return tempuser;
}

module.exports = jobs;



