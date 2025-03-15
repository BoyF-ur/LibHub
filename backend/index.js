// const config = require("./config.json");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const bcrypt = require("bcrypt");
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const User = require("./models/user.model");
// const Book = require("./models/book.model");
// const { authenticateToken } = require("./utilities");


// mongoose.connect(config.connectionString);

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: "*" }));

// //Creat Account
// app.post("/signup", async (req, res) => {
//     const { fullName, email, password, Image } = req.body;
//     if (!fullName || !email || !password) {
//         return res
//             .status(400)
//             .json({ error: true, message: "All fields are required" });
//     }

//     const isUser = await User.findOne({ email });

//     if (isUser) {
//         return res
//             .status(400)
//             .json({ error: true, message: "User already exits" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//         fullName,
//         email,
//         password: hashedPassword,
//     });

//     await user.save();
//     const accessToken = jwt.sign(

//         { userId: user._id },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: "72h",
//         }
//     );

//     return res.status(201).json({
//         error: false,
//         user: { fullName: user.fullName, email: user.email },
//         accessToken,
//         message: "Registration Successful",
//     });


// });

// //Login
// app.post("/login", async (req, res) => {

//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and Password are required" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(400).json({ message: "User not found" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(400).json({ message: "Inalid Credentials" });
//     } 

//     const accessToken = jwt.sign(
//         { userId: user.id },
        
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: "72h",
//         }
//     );
//     return res.json({
//         error: false,
//         message: "Login Successful",
//         //user: { fullName: user.fullName, email: user.email },
//         accessToken,
//     });

// });

// //Get User
// app.get("/get-user", authenticateToken, async (req, res) => {
//     const { userId } = req.user
//     const isUser = await User.findOne({ _id: userId });
//     //console.log(userId, "\n");
//     if (!isUser) {
//         return res.sendStatus(401);
//     }
//     return res.json({
//         user: isUser,
//         message: "",
//     });
// });

// //add book

// app.post("/add-book", authenticateToken, async (req, res) => {
//     const { userId } = req.user;
//     req.body.userId = userId;

//     if (!req.body.title || !req.body.category || !req.body.story || !req.body.date || !req.body.imageUrl) {
//         return res.status(400).json({ error: true, message: "All fields are required" });
//     }

//     const parsedVisitedDate = new Date(parseInt(req.body.visitedDate));
//     req.body.visitedDate = parsedVisitedDate;
//     try {
//         const book = new Book(req.body);

//         await book.save();
//         res.status(201).json({ story: book, message: "Added Successfully" });
//     } catch (error) {
//         res.status(400).json({ error: true, message: error.message });
//     }

// });



// app.listen(8000);
// module.exports = app;

const config = require("./config.json");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user.model");
const Book = require("./models/book.model");
const { authenticateToken } = require("./utilities");


mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

//Creat Account
app.post("/signup", async (req, res) => {
    const { fullName, email, password, Image } = req.body;
    if (!fullName || !email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res
            .status(400)
            .json({ error: true, message: "User already exits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    await user.save();
    const accessToken = jwt.sign(

        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.status(201).json({
        error: false,
        user: { fullName: user.fullName, email: user.email },
        accessToken,
        message: "Registration Successful",
    });


});

//Login
app.post("/login", async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Inalid Credentials" });
    } 

    const accessToken = jwt.sign(
        { userId: user.id },
        
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );
    return res.json({
        error: false,
        message: "Login Successful",
        //user: { fullName: user.fullName, email: user.email },
        accessToken,
    });

});

//Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { userId } = req.user
    const isUser = await User.findOne({ _id: userId });
    //console.log(userId, "\n");
    if (!isUser) {
        return res.sendStatus(401);
    }
    return res.json({
        user: isUser,
        message: "",
    });
});

//add book

app.post("/add-book", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    req.body.userId = userId;

    if (!req.body.title || !req.body.category || !req.body.story || !req.body.date || !req.body.imageUrl) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedVisitedDate = new Date(parseInt(req.body.visitedDate));
    req.body.visitedDate = parsedVisitedDate;
    try {
        const book = new Book(req.body);

        await book.save();
        res.status(201).json({ story: book, message: "Added Successfully" });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }

});

const path = require("path");
const fs = require("fs");

//--------------------bruh
// Load data from db.json
const dbFilePath = path.join(__dirname, "db.json");
// const dbData = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

// // Route to get categories
// app.get("/categories", (req, res) => {
//     res.json(dbData.categories);
// });
const dbFilePath1 = path.join(__dirname, "filter.json");

app.get("/categories", (req, res) => {
    const dbData = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
    res.json(dbData.categories);
});


app.get("/filter", (req, res) => {
    const dbData = JSON.parse(fs.readFileSync(dbFilePath1, "utf-8"));
    res.json(dbData.filter);
});

/*
[{"id":1,"title":"Technology BookShelf","description":"Tên sách","imageUrl":"/public/tech-category.jpg","linkCategory":"http://localhost:5173/category"},{"id":2,"title":"Science BookShelf","description":"Tên sách","imageUrl":"/public/library_view.png","linkCategory":"http://localhost:5173/category"},{"id":3,"title":"History BookShelf","description":"Tên sách","imageUrl":"/public/tech-category.jpg","linkCategory":"http://localhost:5173/category"},{"id":4,"title":"History BookShelf","description":"Tên sách","imageUrl":"/public/tech-category.jpg","linkCategory":"http://localhost:5173/category"},{"id":5,"title":"Economy BookShelf","description":"Tên sách LOL","imageUrl":"/public/tech-category.jpg","linkCategory":"http://localhost:5173/category"}]
*/

//--------------------

app.listen(8000);
module.exports = app;