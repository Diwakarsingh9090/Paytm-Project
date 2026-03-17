const express = require("express");

//Here cors is used to allow cross-origin requests from the frontend to the backend
//  without cors, the frontend will not be able to make requests to the backend
//and it should be used above the routes to work properly..
const cors = require("cors");
app.use(cors());

app.use(express.json());

const mainRouter = require("./routes/index");

const app = express();
app.use("/api/v1", mainRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
 // /api/v1/user/signup 
 // /api/v1/user/signin 
 // /api/v1/user/changePassword 
 // /api/v1/account/transferMoney 
 // /api/v1/account/balance  ..