// Get the entry frame element
const entry_frame = document.getElementById('enter_frame');
let myUsername = '';

// Login function: validates username and updates profile
function Login() {
    let user_name = document.getElementById('user_name');
    if (user_name.value.trim() === "") {
        alert('enter your name to proceed');
    } else {
        let profile_username = document.getElementById('profile_username');
        if (profile_username) {
            profile_username.innerText = user_name.value;
        }
        myUsername = user_name.value.trim();
        if (entry_frame) {
            entry_frame.remove(); // Remove the frame from DOM after login
        }
        // Send username to server
        socket.emit('set username', myUsername);
    }
}

// Function to show entry frame again
function showEntryFrame() {
    // If entry_frame already exists, just show it
    let existing = document.getElementById('enter_frame');
        if (existing) {
            existing.style.display = 'flex';
            let user_name = document.getElementById('user_name');
            if (user_name) user_name.value = '';
            return;
        }
        // Otherwise, insert the original HTML at the top of <body>
        var entryHTML = '<div class="enter_frame" id="enter_frame">' +
            '<div class="enter_frame_name" id="enter_frame_name">' +
            '<h1>Welcome</h1>' +
            '<input type="text" placeholder="Enter your name" id="user_name">' +
            '<button onclick="Login()" id="login_btn">Submit</button>' +
            '</div>' +
            '</div>';
        document.body.insertAdjacentHTML('afterbegin', entryHTML);
}

// Add event listener for Leave Room button
let leaveBtn = document.getElementById('leave_room');
if (leaveBtn) {
    leaveBtn.addEventListener('click', function() {
        showEntryFrame();
    });
}

// The following will work ONLY if you open your app at http://localhost:8080 (your Express/socket.io server)


// Connect to socket.io server
const socket = io();

// Listen for incoming chat messages and display them
socket.on('chat message', (msg) => {
    let msg_area = document.getElementById('msg_area');
    if (!msg_area) msg_area = document.querySelector('.msg_area');

    // Parse message format: "username: message"
    let sender = '', text = msg;
    if (msg.includes(':')) {
        sender = msg.split(':')[0].trim();
        text = msg.substring(msg.indexOf(':') + 1).trim();
    }

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg');
    if (sender === myUsername) {
        msgDiv.classList.add('sent');
    } else {
        msgDiv.classList.add('received');
    }
    msgDiv.textContent = sender ? `${sender}: ${text}` : text;
    msg_area.appendChild(msgDiv);
    msg_area.scrollTop = msg_area.scrollHeight;
});


// Listen for successful connection
socket.on('connect', () => {
    console.log('Connected to the server successfully');
});

// Send message on button click
let sendBtn = document.getElementById('send');
if (!sendBtn) sendBtn = document.querySelector('.btn');
sendBtn.addEventListener('click',send_msg);
document.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        send_msg()
    }
})

function send_msg(){
    let user_msg = document.getElementById('user_msg');
    if (!user_msg) user_msg = document.querySelector('footer input[type="text"]');
    if (user_msg.value.trim() !== '') {
        socket.emit('chat message', user_msg.value);
        user_msg.value = '';
    }
}


// Listen for user list and update sidebar
socket.on('user list', (usernames) => {
    const membersDiv = document.getElementById('connected_members');
    if (!membersDiv) return;
    membersDiv.innerHTML = '';
    usernames.forEach(name => {
        const participant = document.createElement('div');
        participant.classList.add('participant');
        const img = document.createElement('img');
        img.src = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';
        img.alt = 'profile';
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('name');
        nameSpan.textContent = name;
        participant.appendChild(img);
        participant.appendChild(nameSpan);
        membersDiv.appendChild(participant);
    });
});
