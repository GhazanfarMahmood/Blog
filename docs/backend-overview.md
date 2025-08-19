### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- REST API

### Things that i did while creating backend with the help of nodejs and expressjs
- first of all I write "npm init" to initialize the node in the backend of my project.
- as i write the upper command then it asked me a few questions:
- package name: (server) ---[it show as the folder name but we put it blog-backend]--- and i put it "blog-backend"
- version: (1.0.0) by default come it and i didn't make any change and press enter.
- description: you put description of your own like whatever you want, you can put. I put "Backend server for MERN blog site with CRUD operation"
- entry point: (index.js) but my entry point is different as i put a file name of "server.js" in the src folder of backend so i pass the path "src/server.ts"
- test command: as i didn't have any type of test command so i leave it blank and press enter.
- i didn't initialize the git repository: so, i leave it blank if needed then in future i will pass a git's repo link in it.
- keywords: optional but pass it because these keywords give yoy clarity about project. so, i pass: "blog, backend, express, nodejs, mongodb, typescript" 
- author: place or pass your own name "Ghazanfar Mahmood"
- license: (ISC) didn't have enough knowledge but get it later. for now i pass 'MIT'
- and last one is Is this OK? (yes) then if you want to continue or proceed then press enter.



# questions to do tomorrow:
- what is nodejs?
Ans: Node.js is an open source, cross-platform and javascript run-time environment that allows developer to write javascript outside the browser typically on the server.
- built on google chrome's v8 javascript engine.
# ---what is v8 engine?
# ---v8 engine is developed by google and is used in google chrome to run javascript on browser and used in node.js to run javascript on the server.
- Enables building fast and scalable server-side application.
- commonly used to build REST APIs (Representational state transfer application programming interface), real-time apps (like chats), and microservices.
- Uses a non-blocking, event-driven I/O model, making it lightweight and efficient.
# ---what is non-blocking, event driven I/O model?
# ---non-blocking means the program doesn't wait for a task (like reading a file or making a network request) to finish before moving on to the next task.
# ---event-driven means: the program react to events (like a file being read or a request being received) using callbacks, promises and async / awaits.

# ------------------------------------------------------------------
 here's is the small example or comparison between blocking and non-blocking events.
# ------------------------------------------------------------------
blocking event:
const data = fs.readFileSync("file.txt");
console.log('File Content:', data); // Waits here
console.log('Next Line');  // Runs after the file is read.

non-blocking event:
fs.readFile("file.txt", (err, data) => {
    console.log("File content:", data); // runs later
});
console.log("runs immediately");

blocking: You place an order and wait at the counter until it's ready.
non-blocking; you place an order,  get a number, go sit down, and they call you when it's ready (event-driven);

full form of I/O:
input / output
Input: Reading data (like from a file or HTTP request).
Output: Writing data (like sending a response or saving to a database); 

- what is controller.
Ans: In backend development, a controller is the part of application that handle the incoming request process them (using business logic) and return a response (such as json or a rendered view). it act as bridge between client and server.
-- handles incoming request:
listens for specific routes like (/login, /users etc.) and http methods (like get and post method) etc.
-- delegates to business logic/Services:
it usually doesn't contain all the business logic itself, but calls service functions or other layers to process the data.
-- service functions:
are those functions that handles the business logic like (calculating something, querying a database, checking business rule) and in return give result back to controller.
--sends a response:
after process, it send a appropriate HTTP response (like json data, status codes, error messages).
controller is not a bridge, server is a bridge between client and data or services and controller is the a component inside the server. and manages how the server handle the specific request.

what is services function?
Service functions are the parts of your backend that actually handle the business logic — like processing data, performing calculations, checking rules, or querying databases.

The controller receives the HTTP request from the client (like a browser or mobile app), passes the necessary data to the service function, and after the service finishes processing, the controller takes the result and sends an appropriate HTTP response (like JSON, status code, etc.) back to the client.

MVC: model view controller:- 
- model is used to handle the business logic
- view is only for UI (not present in backend).
- controller is act as bridge between client and server.

What is business logic:
- refers to the rules, calculations and process that handle the logic that used in real world application.

-- in ecommerce site: 
--- user can't checkout when the cart is empty.

# ------------------------------------------------------------------
as i try to create a server with the help of http but issue is that it is giving me error because i didn't told to typescript that i am working in node.js environment to tackle. 
- first of all, we install node type with the help of command: 
npm install --save-dev @types/node
- and your issue will be resolve
also you can create configure file with the help of 
npx tsc --init
here's we use the npx instead of npm and also add the keyword like tsc
we create a typescript configuration file because we can do configuration of our own like adding path to root directory or change ecma script version etc.

- What is data model?
A data model is a blueprint which defines what kind of data your app stores, and how different pieces of data are related.

like title: content, author, tags, createdAt, likes, comments

# running of server
you can run a server by writing node "--file-name"
like: node src/server.ts

# to work further on backend, first we have to understand what is network protocols, because protocols are ver important to understand how the server, databases and client connect to each other using protocols like (TCP/IP and HTTP).

Network protocols are the set of data that are responsible for the communication of data between devices over the network. These protocols define what is being communicated, how it is being communicated, when it is being communicated. it also permits the communication of data between various devices irrespective of their internal and external structure differences?

To understand how the network protocols work, first of all we have to understand what is OSI (open system interconnection), it has the 7 layers and each layers has the specific protocols that enable the communication between devices. Each network protocol perform specific task and these tasks are the routing the data, error checking, session management and much more. for example: IP (internet protocol) work at network layer used for the routing of data between devices using the destination addresses and source.


Network communication protocol:
these protocols handle the actual transmission of data between devices over the network. it specify the rules like how the data is being transmitted , formatted and received.
HTTP   --> (hyper text transfer protocol) --> used for transferring the web pages over the internet
HTTPS  --> (hyper text transfer protocol secure) --> secure form of HTTP that uses the encryption (SSL, TLS)
X TCP    --> (transmission control protocol)  --> used for reliable, ordered and error-checked delivery of data 

UDP    --> (user datagram protocol)   --> faster than tcp but no guarantee of data transfer.
X IP     --> (internet protocol)    --> used for the routing of data packets using the route and address source.
X FTP    --> (file transfer protocol)  ---> used for transfer the file between client and server.
X SFTP     --> (secure file transfer protocol) --> secure version of file transfer that uses the SSH for file encryption.

SMTP  --> (simple mail transfer protocol) --> used for transferring the mail from client to server.
IMAP  --> (internet mail access protocol) --> used for the client email to access and handle the email on server.

POP3  --> (post office protocol 3)  --> used for transferring the mail from server to client 

Network secure Protocol:
These protocols are used to ensure that everything is private, secure and protected from the unauthorized  access.

SSL  --> (secure socket layer)  --> provide the encryption for data in transit (deprecated in favor of TSL)
here's transit means data is actually moving from one device to another device
TLS --> (transport layer security)  -->  Successor to SSL, encrypts communication between devices.
HTTPS   --> (hyper text transfer protocol secure)  --> uses SSL/TSL to secure HTTP communications.
SSH    --> (secure shell)  -->   provide secure access to remote computers.
IPSec  --> (internet protocol security)  -->    secures IP communications by authenticating and encrypting packets.

Network management protocol:
These protocols manage, monitor and control the network over the internet, ensuring the everything is working fine on the internet.

SNMP   --> (simple network management protocol)    --> used for monitoring and managing network devices like routers, switches.
ICMP   --> (internet control management protocol)    --> Used for sending error messages and operational information (e.g. ping)
NetFlow  --> (network flow)        --> collect and monitors network traffic data.


- What is encryption?
is the process of converting the readable text or data (plain text) into unreadable text or data using algorithms and key value to protect the data form unauthorized access. the user with the correct key description can access the data.
for example:
Username : admin
Password : 123456

after encryption it look like:
j29#4k@*91m1xA##^Z!


- why we use entry point or why it is important.


# two folders remain to include one is 
- nodemon.json.


microservices: which are small, modular applications that work together to form a larger whole 

# what is the entity relationship diagram
is the visual representation of how different entities (people, object, concepts) are related with each other within a system.

# (ERD)
--user
   |-- name
   |-- email
   |-- password (hashed)
   |-- [posts]

--post
   |-- title
   |-- slug
   |-- content (HTML or JSON)
   |-- image URL
   |-- author (User reference)
   |-- tags/categories
   |-- likes
   |-- [comments]
   |-- timestamps

--comment
   |-- user (reference)
   |-- post (reference)
   |-- content
   |-- timestamp

# here's is the some example that distinction between user and role field
-- id           unique ID for each user
-- name         User's name
-- email        User's email
-- password     Hashed password
-- role         reader, author, admin
-- createdAt    when the user account was created
-- updateAT     last update date


# what is middleware?

# -- general definition
middleware serves as a crucial bridge in software system, facilitating communication between different applications and technologies. it ensure the smooth interaction, allowing diverse software to understand each other smoothly. By managing data exchange, application services, integration and simplifying the complex processes, middleware plays an vital role in creating interconnected system. middleware act as a translator, ensuring that all components work together harmoniously, even if they are built on different technologies. making it a vital in modern software architecture.

it handles the various task like data translation, message queuing, authentication and connectivity.
it provides a link between user, data and applications.
example of middleware are database middleware, server middleware, message oriented middleware, clouds of all kind, enterprise applications and runtime applications.

# -- purposes of middleware

-- Controls Access to Resources
Middleware manages who can access back-end systems like databases or services.

Speeds Up Database Access
It can create a connection pool to let apps quickly connect to databases.

Connects Messaging Systems
Middleware links apps using topics or message queues for smooth communication.

Manages Cloud Service Access
It helps apps connect securely to cloud services like Amazon S3.

Processes Client Requests
Middleware can run logic (like filtering or transforming data) based on what the client asks for.

Handles Load Balancing & Transactions
It spreads traffic across servers and helps manage transactions (e.g., bank transfers) reliably.

Supports Scalability
Middleware can scale up or out—adding more power or more servers to handle more users.

Secures Communication
It secures data using SSL (for encryption) and checks user identity with certificates or login details.

# -- categories of middleware

# -- types of middleware

# -- how does middleware work

# -- advantages of middleware

# -- disadvantages of middleware


explain the comlete url like https://www.cppboxes.com