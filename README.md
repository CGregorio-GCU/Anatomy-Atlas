
# Anatomy Atlas

Table of Contents
- [Anatomy Atlas](#anatomy-atlas)
  - [Introduction](#introduction)
  - [Problem and Solution](#problem-and-solution)
  - [Requirements](#requirements)
    - [High-Level Requirements](#high-level-requirements)
    - [Non-Functional Requirements](#non-functional-requirements)
  - [Technologies](#technologies)
    - [NodeJS 20.11.0 LTS](#nodejs-20.11.0-lts)
    - [React V.18](#react-18)
    - [React Admin V. 4.16.16](#react-admin-v.-4.16.16)
    - [React Admin Data Simple Rest](#react-admin-data-simple-rest-v.-4.16.16)
    - [Clerk API 2021-02-25](#clerk-api-2021-02-05)
    - [Tailwind CSS 3.4.1](#tailwind-css-3.4.1)
    - [shadcn/ui 0.8.0](#shadcnui-0.8.0)
    - [Next 14.2.2](#next-14.22)
    - [TypeScript 5](#typescript-5)
    - [Drizzle ORM 0.30.9](#drizzle-orm-0.30.9)
    - [PostgresSQL 16](#postgressql-16)
    - [Neon Database](#neon-database)
    - [Zustand 4.5.2](#zustand-4.5.2)
    - [GitHub](#github)
  - [New Technologies](#new-technologies)
  - [Technical Approach](#technical-approach)
    - [Logical Solution Design](#logical-solution-design)
    - [Physical Solution Design](#physical-solution-design)
   - [Detailed Technical Design Decision](#detailed-technical-design-decision)
      - [General Technical Approach](#general-technical-approach)
      - [Design \& Approach](#design--approach)
  - [Assessing Risks and Challenges](#assessing-risks-and-challenges)

## Introduction

Anatomy Atlas is a client-facing, user-friendly web application that allows users to learn about three different systems of anatomy: the Skeletal System, the Nervous system, and the Organ System. 

This application was designed with the user in mind, and makes it so the user will want to interact with the application, rather than being forced into using it as a study tool. Additionally, it aims to bridge the gap between expensive study tools, which are efficient at teaching, but not available to all users, and those that are free, but too verbose, and lack substance or form an entry barrier that new users cannot overcome.

## Problem and Solution
| The Problem                                                                                                                                                                                                                                                                                                                                               | The Solution                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resources for learning anatomy can be unavailable for users of all levels, either through a knowledge entry barrier or a financial barrier. | Anatomy atlas aims to teach those of all skill levels about anatomy, and is available for any user to pick up and start with as there is no cost entry barrier. |

## Requirements

Anatomy Atlas features both high-level and non-functional requirements that are supported.

### High-Level Requirements
- Allow users to register and login
- Allow users to reset their passwords
- Prompt users to select a course
- Allow users to begin a lesson
- Allow users to retake passed lessons
- Store user completion data across sessions
- Store user completion data across courses

### Non-Functional Requirements
- Public documentation for Anatomy Atlas including a comprehensive README
- Public documentation for the Admin API
- Documentation for all API endpoints
- Ensure that users' sessions are stored in a secure manner

## Technologies


### NodeJS 20.11.0 LTS  

Purpose – Node is used to allow the API to run on the server-side while the application can run on the client-side.

Chosen – Node is used to allow an Express API to run while using the Drizzle ORM. 
 
### React 18

Purpose – Create the front end of the web application. 

Chosen – Chosen because the framework reduces the amount of boilerplate code written by developers. React also implements the Clerk API effectively

### React Admin V. 4.16.16

Purpose - A front-end framework to build a data-driven administrative dashboard on top of a REST service.

Chosen - Chosen to allow admin users to create new courses, lessons, units, challenges, and options inside the application, without the need for touching the database itself.

### React Admin Simple Data REST V. 4.16.16

Purpose - a Simple REST Data Provider for react-admin, the front-end framework for building admin applications on top of REST services.

Chosen - Chosen to allow working with API calls with custom headers and HTTP Context-Ranges inside the application.

### Clerk API 2021-02-25

Purpose - Store user information through a user registration and login process

Chosen - Chosen to store user information using JSON Web Tokens, which allow for user session data to be shared until the user logs out (or until a predetermined time has passed)

### Tailwind CSS 3.4.1 

Purpose – Provide styling to the front-end web application components

Chosen – Chosen because the framework helps developers write and maintain CSS code within the application.  

### shadcn/ui 0.8.0

Purpose – shadcn/ui is a Tailwind CSS component collection that provides further styling options for our application. 

Chosen – Chosen because the component collection helps developers utilize Tailwind CSS for faster development, cleaner HTML, and customization of components. 

### Next 14.2.2

Purpose – Create the back end of the web application. 

Chosen – Chosen because it is the fastest way to build web applications in React through server-side rendering.

### TypeScript 5

Purpose – TypeScript will be utilized to create the API 

Chosen – Chosen because it excels at longevity and eliminates technical debt in environments where numerous developers contribute to the codebase, like in open-source software projects.  

### Drizzle-ORM 0.30.9 
Purpose – Create data access objects found in the data layer. Retrieve data from the Neon PostgreSQL database. 

Chosen – Chosen because it provides data models that allow for interaction between schema as options for the creation of queries.
 
### PostgreSQL 16 

Purpose – Store data to track students.

Chosen – Chosen to allow implementation of an online database, which allows data to be stored without a hosted or local solution.

### Neon Database 
Purpose – Host the PostgresSql Database in the cloud. 

Chosen – Chosen because it allows the storage of data off the client computer, while implementing nicely with the Drizzle ORM.

### Zustand 4.5.2
Purpose - State management with an API based on hooks

Chosen - Chosen to allow for the quick creation of Modals 

### GitHub 
Purpose – Allows developers on the team to make changes to the code at the same time. Allows code to be stored in the cloud to prevent data from being lost.  

Chosen – GitHub is an industry-standard for Git and Version Control.

## New Technologies
This application involved the learning of new technologies, which include, but are not limited to:
	
 - PostgresSql
 - Drizzle ORM
 - Neon Database
 - NextJS
 - Clerk API
 - ShadCN UI
 - React Admin
 - Zustand

## Technical Approach

### Logical Solution Design
The logical solution design depicts the high-level software architecture and interactions in the React application, which relies on React and Next.js code in for the front end, and the ClerkAPI as well as the DrizzleORM running on Express.js to manage the back-end data associated with the Neon PostgreSQL database. 

![image](https://github.com/CGregorio-GCU/Anatomy-AtlasV3/blob/main/Diagrams/Logical%20Solution%20Design.drawio.png)

### Physical Solution Design
The following diagram denotes the architecture of the application in regard to the separation of the front and back-end.

![image](https://github.com/CGregorio-GCU/Anatomy-AtlasV3/blob/main/Diagrams/CST-451%20Logical%20System%20Architechture.drawio.png)



## Detailed Technical Design Decision
#### General Technical Approach
This application was completed in an approach similar to the Waterfall methodology, where development was approached by fulfilling a feature's functionality in one Git commit and building upon the promised features in each iteration of the application's history. This approach of building a feature, testing it, releasing it, and starting on another feature ensured that parts of the application touched in the beginning would not lose functionality later.

#### Design & Approach
In completing this application, one of the most important design approaches to follow was to make a website that felt familiar for users to use, and in doing so, making a layout that users would think is easier to navigate. This website aims to emulate the UI seen in the Duolingo app, and as such, careful deliberation went into making buttons that felt cartoonish, but very impactful when placed on the screen.


## Assessing Risks and Challenges
Some of the challenges that arose as a result of this project stemmed from the usage of new technologies, and sifting through the documentation to craft a solution that would be applied to Anatomy Atlas. 

- Authentication
	- The biggest issues arose from the idea of User Authentication and Session Variables, which is where the ClerkAPI came in, allowing for the User to be stored in a session variable that could be addressed in other parts of the application.
-	Database Queries
	-	Queries would prove to be difficult as forward, lateral thinking is required to craft a solution that would work regardless of the front end provided.
- Request Times
	- A persistent issue in the application is that a user is able to make requests quicker than the application is able to handle them, which makes their lesson progress appear to be much higher than it actually is.
		- This issue does not affect the user's lesson progress, so refreshing the page will fix the issue.
