const contactList = [
    { id: 1, name: 'Thomas' },
    { id: 2, name: 'Arthur' },
    { id: 3, name: 'Finn' }, 
    { id: 4, name: 'John' }
];

let currentChat = null;
let messages = {};

// Load contact list
window.onload = function () {
    const contactListElement = document.getElementById('contact-list');
    contactList.forEach(contact => {
        const contactItem = document.createElement('li');
        contactItem.innerText = contact.name;
        contactItem.setAttribute('data-id', contact.id);
        contactItem.onclick = () => openChat(contact);
        contactListElement.appendChild(contactItem);
    });
}

// Open a chat with a contact
function openChat(contact) {
    currentChat = contact;
    document.getElementById('chat-title').innerText = contact.name;
    
    // Display previous messages (if any)
    document.getElementById('chat-body').innerHTML = '';
    if (messages[contact.id]) {
        messages[contact.id].forEach(msg => {
            addMessage(msg.content, msg.type);
        });
    }
}

// Send message when clicking the send button
document.getElementById('send-btn').addEventListener('click', () => {
    sendMessage();
});

// Send message when pressing Enter
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Send message function
function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value.trim();
    
    if (message && currentChat) {
        // Add and display the sent message
        addMessage(message, 'sent');
        saveMessage(currentChat.id, message, 'sent');
        messageInput.value = '';
        
        // Auto-reply after a delay
        setTimeout(() => {
            const reply = generateReply(message);
            addMessage(reply, 'received');
            saveMessage(currentChat.id, reply, 'received');
        }, 1000);
    }
}

// Add a message to the chat window
function addMessage(content, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.innerText = content;

    messageElement.appendChild(messageContent);
    document.getElementById('chat-body').appendChild(messageElement);

    // Scroll to the bottom after sending/receiving a message
    document.getElementById('chat-body').scrollTop = document.getElementById('chat-body').scrollHeight;
}

// Save message to chat history
function saveMessage(contactId, content, type) {
    if (!messages[contactId]) {
        messages[contactId] = [];
    }
    messages[contactId].push({ content: content, type: type });
}

// Generate automated replies based on user input
function generateReply(message) {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage === 'hi') {
        return 'Hello!';
    }
    else if (lowerCaseMessage === 'good morning') {
        return 'Good morning!';
    }
    else if (lowerCaseMessage === "what are you doing?") {
      return "Making websites!";
    }
    else if (lowerCaseMessage === "what is your morning routine?") {
      return "Wake up..\nMake my bed..\nBrush my teeth...\nExercise..\nMake Breakfast..\nGo to college :)";
    }
    else if (lowerCaseMessage === "what is your night-time routine?") {
      return "Make Dinner..\nHave a nice dinner..\nWash dishes..\nBrush my teeth..\nGo to Bed :)";
    }
    else if (lowerCaseMessage === "what food did you make in breakfast?") {
      return "Sandwiches";
    }
    else if (lowerCaseMessage === "what food did you make in dinner?") {
      return "Rice with chicken curry";
    } else {
      return "Sorry, I didn't understand that.";
    }
}