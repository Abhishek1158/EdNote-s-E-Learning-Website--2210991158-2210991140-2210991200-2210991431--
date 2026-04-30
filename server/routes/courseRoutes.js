const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
// Seed all courses
router.post("/allcourse", async (req, res) => {
  try {
    await Course.deleteMany({}); // clear old data
    const courses = [{
        title:"React Basics",
        content:"Learn fundamentals of React and build interactive UI.",
        lessons:[{
            title:"Introduction to React",
            slides:[
              { title: "What is React?",  image: "/images/React Basics.png",content: "React is a JavaScript library for building user interfaces." },
              { title: "React Components", content: "Components let you split the UI into independent, reusable pieces." },
            ],
            quiz: [
              { question: "What is React primarily used for?", options: ["Backend Development", "User Interfaces", "Database Management", "Machine Learning"], answer: "User Interfaces" },
              { question: "Components in React are:", options: ["Reusable", "Mandatory", "Database Tables", "Hooks"], answer: "Reusable" },
            ],
          },
          {
            title:"React State & Props",
            slides:[
              { title: "State in React", image: "/images/node.png", content: "State represents data that changes over time." },
              { title: "Props in React", content: "Props are read-only parameters passed to components." },
            ],
            quiz:[
              { question: "What is State in React?", options: ["External database storage", "Built-in object that stores component data", "CSS styling method", "Routing mechanism"], answer: "Built-in object that stores component data" },
              { question: "State in React are:", options: ["Page reloads", "Browser closes", "Component re-renders", "None"], answer: "Mutable" },
              { question: "What happens when state changes in React?", options: ["Mutable", "Immutable", "Database Fields", "Hooks"], answer: "Mutable" },
              { question: "Props in React are used to:", options: ["Store database data", "Create APIs", "Pass data between components", "Manage CSS"], answer: "Pass data between components" },
              { question: "Props in React are:", options: ["Mutable", "Immutable", "Database Fields", "Hooks"], answer: "Immutable" },
              { question: "Props are passed to components using?", options: ["State variables", "Functions", "Hooks", "Attributes in JSX"], answer: "Attributes in JSX" },
            ],
          },
        ],
      },
      {
        title:"Node.js Fundamentals",
        content:"Learn backend development using Node.js and Express. Node.js fundamentals includes learning about its architecture, modules, event-driven system, and how it handles requests efficiently. These core concepts help developers write efficient server-side code and manage application performance effectively.",
        lessons:[{
            title:"Introduction to Node.js",
            slides:[
              { title: "Node.js Overview", content: "Node.js is a JavaScript runtime built on Chrome's V8 engine. Node.js is a powerful runtime environment that allows developers to execute JavaScript outside the browser. It is widely used for building backend applications and server-side services. By using JavaScript on both the client and server, developers can create full-stack applications using a single programming language. Node.js is designed to handle multiple requests efficiently, making it a popular choice for modern web applications.", image: "/images/node.png" },
              { title: "Why Node.js?", content: "Server-Side JavaScript Node.js enables developers to run JavaScript on the server, allowing the same language to be used for both frontend and backend development. Asynchronous and Non-Blocking Architecture It processes multiple operations without waiting for each task to finish, which helps improve application performance and responsiveness. Single-Threaded Event Loop Node.js manages concurrent operations using an event loop, reducing the need for multiple threads and minimizing system overhead. " },
            ],
            quiz:[
              { question: "What is Node.js primarily used for?", options: ["Designing web pages", "Running JavaScript on server", "Editing images", "Creating CSS styles"], answer: "Running JavaScript on server" },
              { question: "Node.js is built on which engine?", options: ["V8 Engine", "SpiderMonkey", "Chakra", "Rhino"], answer: "V8 Engine" },
              { question: "Node JS uses which model to handle multiple requests efficiently?", options: ["Multi-threading", "Blocking I/O", "Event loop", "Batch processing"], answer: "Event loop" },
              { question: "Node.js follows which architecture?", options: ["Event driven architecture", "Layered architecture", "MVC architecture", "None"], answer: "Event driven architecture" },
              { question: "Which module is used to create a server in Node.js?", options: ["fs", "path", "url", "http"], answer: "http" },
              { question: "Which file contains project dependencies in Node.js?", options: ["config.js", "package.json", "index.html", "server.js"], answer: "package.json" },
            ],
          },
          {
            title:"Express.js",
            slides:[
              { title: "What is Express?", content: "Express is a minimal and flexible Node.js web application framework. Express.js is widely used for creating RESTful APIs, web servers, and backend services for modern applications. Its lightweight design allows developers to add only the features they need while maintaining good performance. Instead of writing complex server code from scratch, Express.js offers built-in tools and middleware that make development faster and more organized. Developers can easily integrate third-party middleware for authentication, logging, error handling, and other features.", image: "/images/express.png" },
              { title: "Why use Express.js?", content: "Express.js is widely used because it simplifies backend development in Node.js applications. It provides a clear structure for handling routes, requests, and responses, making server-side programming easier to manage. Developers can build APIs and web applications faster without writing large amounts of repetitive code. It offers a powerful routing system that helps manage different application endpoints. Middleware support allows developers to add functionality such as authentication, logging, and request processing." },
              { title: "How Express.js works?", content: "Express.js works by receiving requests from clients, processing them through middleware functions and sending responses back to the user. When a user accesses a route the framework determines which function should handle request. Middleware functions can modify requests, perform validation or handle errors before the final response is sent." },
            ],
            quiz:[
              { question: "Express.js is used for?", options: ["Frontend UI", "Backend APIs", "Database Queries", "Machine Learning"], answer: "Backend APIs" },
              { question: "Which method is used to create a server in Express.js?", options: ["initServer()", "createServer()", "express()", "All of these"], answer: "express()" },
              { question: "In Express.js middleware stands for?", options: ["Function that process requests and responses", "Frontend library", "Database engine", "Browser extension"], answer: "Function that process requests and responses" },
              { question: "Express.js is used to build?", options: ["Frontend UI", "Operating systems", "Game engines", "RESTful APIs"], answer: "RESTful APIs" },
              { question: "Which method is used to handle GET requests in Express.js?", options: ["app.post()", "app.use()", "app.get()", "app.listen()"], answer: "app.get()" },
            ],
          },
        ],
      },
      {
        title:"HTML - CSS ",
        content:"Deep dive into HTML structure and CSS styling. HTML and CSS mastery refers to gaining a strong understanding of how to structure and design web pages effectively. HTML is used to create the foundation of a webpage by defining elements such as headings, paragraphs, images, links, and forms. It provides the structure that tells the browser how content should be organized and displayed. HTML and CSS helps developers create clean, accessible, and well-structured web pages. It also provides the essential skills needed for modern frontend development and serves as a strong foundation.",
        lessons:[{
            title:"HTML Basics",
            slides:[
              { title: "HTML Elements", content: "HTML elements define structure. They are the building blocks of web pages. Each element defines a part of the page's structure and content. For example, headings, paragraphs, lists, images, and links are all represented by HTML elements. HTML elements can also be nested, meaning an element can contain other elements, allowing developers to create complex page layouts.", image: "/images/htmlcss.png" },
              { title: "HTML Attributes", content: "Attributes Provide additional info. Attributes provide additional information about an HTML element and control its behavior or appearance. They are written inside the opening tag and usually come in name-value pairs. Attributes allow developers to set properties such as id's, classes, styles, hyperlinks, form input types etc. Using attributes effectively helps make HTML elements dynamic, accessible, and easy to style with CSS or manipulate with JavaScript." },
              { title: "HTML Tags", content: "HTML tags are special keywords used to define elements in a webpage. They are written inside angle brackets, such as <p>, <h1>, or <div>. Tags tell the browser how to interpret and display the content they contain. Some tags require both opening and closing parts, while others are self-closing, such as <img> or <br>." },
              { title: "HTML Paragraphs", content: "Paragraphs are used to display blocks of text in a structured format. The <p> element is commonly used to separate content into readable sections. Using paragraphs helps improve readability and organizes written information effectively on a webpage." },
              { title: "HTML Forms", content: "HTML forms are used to collect information from users on a webpage. They allow users to enter data such as names, email addresses, passwords, or messages. Forms typically include input fields, text areas, buttons, and dropdown menus." },
              { title: "HTML Buttons", content: "Buttons in HTML allow users to perform actions such as submitting forms, triggering events, or navigating pages. The <button> element or <input type=button> can be used to create clickable buttons. Buttons play an important role in interactive web applications by allowing users to initiate actions easily." },
            ],
            quiz:[
              { question: "HTML stands for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlinks Text Mark Language", "None"], answer: "HyperText Markup Language" },
              { question: "Which tag is used to create a paragraph in HTML?", options: ["<para>", "<h1>", "<p>", "None"], answer: "<p>" },
              { question: "Which attribute specifies the URL of a link?", options: ["href", "src", "url", "link"], answer: "href" },
              { question: "Which attribute is used to open a link in a new tab?", options: ["target=_blank ", "new", "tab", "href"], answer: "target=_blank " },
              { question: "Which tag is used to define the metadata in an HTML document?", options: ["<meta>", "<title>", "<head>", "<body>"], answer: "<head>" },
              { question: "What is the default property of a <div> element?", options: ["block", "inline", "flex", "none"], answer: "block" },
              { question: "What does the target=_self attribute do in an <a> tag?", options: ["Opens link in new tab", "Opens link in pop-up", "Opens link in same window", "Opens link in an iframe"], answer: "Opens link in same window" },
              { question: "Which HTML element is used to define navigation links for a website?", options: ["<header>", "<body>", "<nav>", "<menu>"], answer: "<nav>" },
              { question: "Which element in HTML is used to display code snippets?", options: ["<pre>", "<var>", "<code>", "<h1>"], answer: "<code>" },
            ],
          },
          {
            title:"HTML Lists & Tables",
            slides:[
              { title: "HTML Lists", content: "HTML has different types of lists to organize content: Ordered Lists (<ol>): Displays items in a numbered sequence. Unordered Lists (<ul>): Displays items with bullet points. Lists improve readability by grouping related content, creating structured layouts, and supporting nested lists for more complex hierarchies." },
              { title: "HTML Tables", content: "Tables in HTML are used to organize and display data in a structured format, with rows and columns. The <table> element acts as the container, while <tr> defines table rows, <th> represents header cells, and <td> represents standard data cells. Additional tags like <caption> can provide a descriptive title for the table, and <thead>, <tbody>, and <tfoot> help structure the table for better readability and accessibility. Tables are widely used for presenting schedules, statistics, comparison charts, and other structured data in a clear, tabular format.", },
            ],
            quiz:[
              { question: "What does <li> tag represent in lists?", options: ["Definition term", "List container", "List item", "List title"], answer: "List item" },
              { question: "Which of the following is used to create an ordered list?", options: ["<ul>", "<ol>", "<li>", "<dl>"], answer: "<ol>" },
              { question: "Which HTML element is used for an unordered list?", options: ["<ul>", "<li>", "<ol>", "<dl>"], answer: "<ul>" },
              { question: "In a definition list, which tag defines a term?", options: ["<dd>", "<dt>", "<ol>", "<dl>"], answer: "<dt>" },
              { question: "What is the correct way to create a nested list in HTML?", options: ["Place <li> inside <dt>", "Place <ul> or <ol> inside <li>", "Place <ul> inside <table>", "Place <li> inside <ul> outside the list"], answer: "Place <ul> or <ol> inside <li>" },
              { question: "Which HTML element is used to create a table?", options: ["<table>", "<tr>", "<ol>", "<tab>"], answer: "<table>" },
              { question: "Which tag defines a table row?", options: ["<td>", "<tr>", "<tab>", "<table>"], answer: "<tr>" },
              { question: "What does <td> represent in a table?", options: ["Table data cell", "Table container", "Table row", "Table column"], answer: "Table data cell" },
            ],
          },
          {
            title:"CSS Flexbox",
            slides:[
              { title: "Flex Container", content: "Parent element using flex." },
              { title: "Flex Items", content: "Child elements inside a flex container." },
            ],
            quiz:[
              { question: "Flexbox helps with?", options: ["Layout", "Database", "Routing", "Security"], answer: "Layout" },
            ],
          },
        ],
      },
      {
        title:"JavaScript Fundamentals",
        content:"JavaScript fundamentals focus on learning how to build interactive and dynamic web applications using one of the most widely used programming languages. JavaScript allows developers to control webpage behavior, respond to user actions, manipulate content, and communicate with servers. By understanding variables, functions, events, and the document object model (DOM), developers can create responsive user experiences. Mastering JavaScript provides a strong foundation for modern web development and prepares learners for advanced frameworks and full-stack development.",
        lessons:[{
            title:"JavaScript Basics",
            slides:[
              { title: "Introduction to JavaScript", content: "JavaScript is a programming language used to add interactivity to websites and to access database also. It allows developers to create dynamic features such as form validation, interactive menus, animations, and real-time updates. JavaScript runs directly in the browser and works alongside HTML and CSS to build modern web applications.", image: "/images/javascript.png" },
              { title: "Variables", content: "Variables are used to store data in JavaScript. They allow to store values such as numbers, text, or objects that can be used later in the code. JavaScript provides different ways to declare variables, including let, const, and var. Using variables makes programs flexible and easier to manage. These keywords are like local scope, global scope and block scope. Some of them can't be reassigned or redeclared." },
              { title: "Data Types", content: "Data types describe the value stored in a variable. Common JavaScript data types include numbers, strings, booleans, arrays, and objects. Understanding data types helps developers perform operations correctly and manage program logic effectively. They are of two types Primitive Datatypes and Non-Primitive Datatypes. Primitive represent one value and it is immutable like it contains Number, String, Boolean, Undefined, Null, Symbol, BigInt. Non-Primitive types are of objects that store collection of data like Object, Array, Function." },
              { title: "Operators", content: "Operators are symbols used to perform operations on values and variables. It include arithmetic operators for calculations, comparison operators for checking conditions, and logical operators for combining expressions. Operators help control how data is processed within a program." }
            ],
            quiz:[
              { question: "Which language is used in web pages interactivity and logic?", options: ["HTML", "CSS", "JavaScript", "SQL"], answer: "JavaScript" },
              { question: "Which keyword is used to declare a variable in modern JavaScript?", options: ["let", "var", "const", "All of the above"], answer: "All of the above" },
              { question: "Output of console.log(5 > 3 > 2); is?", options: ["1", "true", "false", "undefined"], answer: "false" },
              { question: "Which data type represents true or false values?", options: ["String", "Boolean", "Number", "Array"], answer: "Boolean" },
              { question: "Which operator is used for addition?", options: ["+", "-", "*", "/"], answer: "+" },
              { question: "What is output for this console.log(null === undefined); ?", options: ["0", "false", "null", "true"], answer: "false" },
              { question: "Output of console.log( [] === [] ); is?", options: ["1", "true", "0", "false"], answer: "false" },
              { question: "Output of console.log(true == 1); is?", options: ["1", "true", "0", "null"], answer: "true" },
              { question: "Use of += operator in JS is?", options: ["addition of two numbers", "it adds and assign the result", "it multiplies variable", "it assigns value"], answer: "it adds and assign the result" },
              { question: "Which is a logical operator?", options: ["&&", "?", "||", "!"], answer: "&&" },
              { question: "Output of console.log(true && false); is?", options: ["0", "false", "true", "null"], answer: "false" },
              { question: "Output of console.log(true || false); is?", options: ["undefined", "false", "true", "1"], answer: "true" },
              { question: "Operator that is used to compare two values for strict equality in JS?", options: ["==", "=", "===", "!="],answer: "===" },
            ]
          },
          {
            title:"Functions & Control Flow",
            slides:[
              { title: "Functions", content: "Functions are reusable blocks of code that perform a specific task. They help organize programs and reduce repetition by allowing developers to write code once and reuse it multiple times. Functions can accept inputs called parameters and return results after executing their logic.  In function parameters are placeholders defined while when calling the function there are actual value named as arguments." },
              { title: "Conditional Statements", content: "Conditional statements allow programs to make decisions based on certain conditions. JavaScript commonly uses if, else if, and else statements to execute different code depending on whether a condition is true or false." },
              { title: "Loops", content: "Loops are used to repeat a block of code multiple times until some condition evaluates. JavaScript includes loops such as for, while, and do-while. Loops are useful for working with arrays, processing large datasets, and automating repetitive tasks." }
            ],
            quiz:[
              { question: "What is the purpose of a function in JavaScript?", options: ["Store images", "To re-use blocks of code", "Style web pages", "Create databases"], answer: "To re-use blocks of code" },
              { question: "What are parameters?", options: ["Variables defined in function", "Placeholders for input values", "Output values returned", "Actual values passed"], answer: "Placeholders for input values" },
              { question: "Which function does not have name and assigne to a variable?", options: ["Anonymous", "Named", "Callback", "Constructor"], answer: "Anonymous" },
              { question: "Which statement is used to check conditions?", options: ["loop", "if", "return", "function"], answer: "if" },
              { question: "Which loop repeats code a specific number of times?", options: ["for loop", "if statement", "switch", "break"], answer: "for loop" }
            ]
          },
          {
            title:"JavaScript DOM Basics",
            slides:[
              { title: "DOM Introduction", content: "The Document Object Model (DOM) represents the structure of a webpage as objects that JavaScript can interact with. By accessing the DOM, developers can change text, modify styles, create elements, and respond to user actions dynamically." },
              { title: "Event Handling", content: "Events are actions that occur in the browser, such as clicks, typing, or page loading. JavaScript allows developers to listen for these events and run specific code when they happen. Event handling makes websites interactive and responsive to user behavior." }
            ],
            quiz:[
              { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Method", "Digital Output Mode", "Document Ordering Model"], answer: "Document Object Model" },
              { question: "Which event occurs when a user clicks a button?", options: ["hover", "click", "load", "submit"], answer: "click" }
            ]
          }
        ]
      },
      {
        title:"Data Structures",
        content:"This topic data structures is used in software development, organizing and managind data. Help in writting better programs and solving problems.",
        lessons:[{
            title:"Introduction to Data Structures",
            slides:[
              { title: "What are Data Structures?",  image: "/images/Data Structures.png",content: "Data Structures are ways to organize and store data so that it can be used for better learning and understanding concepts." },
              { title: "Importance of Data Structures?", content: "They help in managing data, solving coding problems and improving performance. DSA helps in thinking logically and understanding coding fundamentals to plan tasks and makes debugging easier. " },
            ],
            quiz: [
              { question: "What is main use of Data Structures?", options: ["Backend Development", "User Interfaces", "Managing and organizing data in better way", "Machine Learning"], answer: "Managing and organizing data in better way" },
              { question: "Data Structures help in ?", options: ["optimizing Performance", "Mandatory Development", "Database Tables", "Storing Images"], answer: "Reusable" },
              { question:"Which data structure uses LIFO", options:["Tree","Linked List","Stack","Array"], answer:"Stack"},
              { question:"Which data structure uses FIFO", options:["Queue","Heap","Stack","Array"], answer:"Queue"},
              { question:"Which data structure is used for hierarchical structure", options:["HashMap","Linked List","Tree","Array"], answer:"Tree"},
              { question:"Which of these is used to add an element in a stack", options:["dequeue","add","insert","push"], answer:"push"},
            ],
          },
          {
            title:"Array",
            slides:[
              { title: "What in an Array.", content: "Array is collection of elements stored in contiguous memory location. Accessed via using an index. " },
              { title: "Key Features.", content: "Array allows fast accessing of element by using indexing with fixed size and moving of elements for inserting or deleting." },
            ],
            quiz:[
              { question: "Elements in Arrays are accessed by ?", options: ["value", "index", "key", "All of these"], answer: "index" },
              { question: "Arrays are stored in:", options: ["Heap", "Random Memory", "Contiguous Memory", "None"], answer: "Contiguous Memory" },
              { question: "What is time complexity to access an element in an array?", options: ["O(1)", "O(logn)", "O(n)", "O(nlogn)"], answer: "O(1)" },
              { question: "Size of an array is?", options: ["dynamic", "fixed", "random", "infinite"], answer: "fixed" },
              { question: "Which searching technique is used when an array is sorted?", options: ["DFS", "Linear Search", "Binary Search", "All of these"], answer: "Binary Search" },
              { question: "Fastest operation in an array is?", options: ["Deleting", "Accessing", "Inserting", "Searching"], answer: "Accessing" }
            ],
          },
          {
            title:"Linked List",
            slides:[
              { title: "What in a Linked List.", content: "A linked list is a collection of nodes where each node contains data and address of next node. " },
              { title: "Advantages of Linked List.", content: "Linked List allows dynamic memory allocation and easy to insert or delete a node without shifting or removing any element." },
            ],
            quiz:[
              { question: "Each node contains?", options: ["value", "data and pointer", "key", "function"], answer: "data and pointer" },
              { question: "Linked List is better than Array in", options: ["Frequent insertions", "Memory", "Searching", "Deletion"], answer: "Frequent insertions" },
              { question: "How to move to next node in Linked List?", options: ["By functions", "By index", "By pointer", "By value"], answer: "By pointer" },
              { question: "Time Complexity to search an element in a linked list?", options: ["O(n)", "O(1)", "O(nlogn)", "O(logn)"], answer: "O(n)" },
              { question: "Which type of memory allocation is use by linked list?", options: ["Random", "Linear", "Dynamic", "Static"], answer: "Dynamic" },
              { question: "Last node in linked list points to?", options: ["head node", "random node", "null", "all of these"], answer: "null" }
            ],
          },
        ],
      },
    ];
    const created = await Course.insertMany(courses);
    res.json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
// to get the all courses
router.get("/", async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});
// to get the single course by ID
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});
module.exports = router;