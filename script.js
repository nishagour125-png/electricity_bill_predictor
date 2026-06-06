// LOGIN
// 🔐 LOGIN FUNCTION
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("username", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Username or Password ❌");
    }
}
// LOAD PROFILE
function loadUser() {
    let name = localStorage.getItem("username");
    let savedName = localStorage.getItem("profileName");

    let finalName = savedName ? savedName : name;

    document.getElementById("welcomeText").innerText = "Welcome, " + finalName + " 👋";
    document.getElementById("profileName").innerText = finalName;
}

// SAVE PROFILE NAME
function saveProfile() {
    let newName = document.getElementById("editName").value;

    if (newName === "") {
        alert("Enter name");
        return;
    }

    localStorage.setItem("profileName", newName);
    loadUser();

    alert("Profile Updated ✅");
}

// UPLOAD IMAGE
function uploadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function () {
        document.getElementById("profilePic").src = reader.result;
        localStorage.setItem("profilePic", reader.result);
    }

    reader.readAsDataURL(file);
}

// LOAD IMAGE ON START
window.onload = function () {
    if (localStorage.getItem("username")) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        loadUser();

        let savedPic = localStorage.getItem("profilePic");
        if (savedPic) {
            document.getElementById("profilePic").src = savedPic;
        }
    }
}

// 👤 SHOW USER NAME (Dashboard)
function showUser() {
    let name = localStorage.getItem("username");

    if (name) {
        let welcome = document.getElementById("welcomeText");
        let profile = document.getElementById("profileName");

        if (welcome) {
            welcome.innerText = "Welcome, " + name + " 👋";
        }

        if (profile) {
            profile.innerText = name;
        }
    }
}


// ⚡ BILL CALCULATE
function calculateBill() {
    let units = document.getElementById("units").value;

    if (units === "" || units <= 0) {
        alert("Enter valid units");
        return;
    }

    let rate = 7;
    let total = units * rate;

    document.getElementById("billAmount").innerText = "₹" + total;
}


// 🚪 LOGOUT
function logout() {
    localStorage.removeItem("username");
    window.location.href = "index.html";
}


// 🔄 AUTO RUN (page load)
window.onload = function () {

    // 🔒 Protect Dashboard
    if (window.location.pathname.includes("dashboard.html")) {
        if (!localStorage.getItem("username")) {
            window.location.href = "index.html";
        }
    }

    // 👤 Show user name
    showUser();
}
function askAI() {
    let msg = document.getElementById("userInput").value.toLowerCase();
    let reply = "";

    if (msg.includes("bill")) {
        reply = "Your bill = units × rate (₹7 per unit).";
    }
    else if (msg.includes("payment")) {
        reply = "You can pay using UPI, Card or Net Banking.";
    }
    else if (msg.includes("complaint")) {
        reply = "Go to complaint section and submit your issue.";
    }
    else {
        reply = "Try asking about bill, payment or complaint 🙂";
    }

    document.getElementById("chatOutput").innerText = reply;
} import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: userMessage }]
        })
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log("Server running"));
