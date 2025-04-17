const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const newContact = {
        name: name,
        phone: phone,
        email: email
    };

    fetch('/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
    })
    .then(response => response.json())
    .then(data => {
        displayContacts(data);
        form.reset();
    });
});

function displayContacts(contacts) {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `${contact.name} - ${contact.phone} - ${contact.email}`;
        contactList.appendChild(li);
    });
}

// Fetch contacts on page load
window.onload = function() {
    fetch('/contacts')
    .then(response => response.json())
    .then(data => displayContacts(data));
};
