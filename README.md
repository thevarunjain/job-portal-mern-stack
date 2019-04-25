# Linkedin Prototype using MERN Stack
## Introduction 

Using Restful web services, React JS, NodeJS MySQL, Kafka, NoSQL database MongoDB we have successfully created a prototype of LinkedIn. Our application consists of two main type of users: Applicant and Recruiter. 

After logging in, the user gets presented with a different view of the system depending on the role i.e. the user is Applicant or Recruiter. If the logged in user is an Applicant, they are shown user dashboard which has the analytics of all the user activity on our website. We’ve used Charts.js library to display the graphs of all user activity.

Applicant has various functionalities such as Search and Apply for a Job, Messaging, Networking with people i.e. ability to connect with other people (implemented using GraphDB) and view and edit profile.
Recruiter has various functionalities such as Posting a Job, Messaging, Networking with people i.e. ability to connect with other people (implemented using GraphDB) and view and edit profile.


## System Architecture

![image](https://user-images.githubusercontent.com/42597460/56462199-09021b80-6374-11e9-854e-d48a06b292bd.png)


## Technologies Used

|   Stack      | Technology Used| Hosting       |
|     :---:    |     :---:      |     :---:     |
| Frontend     | React with Redux     | 2 AWS EC2 Instances    |
| Backend      | Node js       | 3 AWS EC2 Instances      |
| Messaging/Queue     | Kafka       | 4 AWS EC2 Instances      |
| Database     | MySQL       | AWS RDS      |
|      | GraphDB       | Graphstory      |
|      | MongoDB       | 3 AWS Replicas      |
|      | S3 Bucket       | AWS S3 Bucket      |

## Database Design 
![image](https://user-images.githubusercontent.com/42597460/56462187-d0624200-6373-11e9-9255-1492ff01d9e1.png)
