const dotenv= require("dotenv");


dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const UserRouter= require("./Routes/User.route")
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL).then(() => console.log("DB connected successfully"))
.catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
});

app.use(cors({
    origin: ["http://localhost:5173", "https://chat-bot-frontend-bice.vercel.app"],
    methods: ["GET", "POST","PUT","PATCH","DELETE"],        
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true, 
}));
app.use(express.json());
const PORT = process.env.PORT||5001;


app.use("/api",UserRouter)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
