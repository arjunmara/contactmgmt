document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    const contactTable = document.getElementById('contact-table');
    const noContacts = document.getElementById('no-contacts');
    const errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';
    contactForm.appendChild(errorMessage);
    let contactCount = 0;
    const contacts = [];

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const addressInput = document.getElementById('address');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const address = addressInput.value.trim();

        if (validateForm(name, email, phone, address)) {
            addContact(name, email, phone, address);
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            addressInput.value = '';
        }
    });

    function validateForm(name, email, phone, address) {
        errorMessage.style.display = 'none';
        if (!name || !email || !phone || !address) {
            showError('All fields are required.');
            return false;
        }
        if (contacts.some(contact => contact.email === email)) {
            showError('Email must be unique.');
            return false;
        }
        if (contacts.some(contact => contact.phone === phone)) {
            showError('Phone number must be unique.');
            return false;
        }
        return true;
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function addContact(name, email, phone, address) {
        contactCount++;
        contacts.push({ name, email, phone, address });

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${contactCount}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${address}</td>
            <td class="actions">
                <button class="edit" onclick="editContact(this)">Edit</button>
                <button class="delete" onclick="confirmDelete(this)">Delete</button>
            </td>
        `;

        contactList.appendChild(tr);
        updateTableVisibility();
    }

    window.confirmDelete = function (button) {
        const name = button.parentElement.parentElement.children[1].textContent;
        const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
        if (confirmDelete) {
            deleteContact(button);
        }
    };

    window.deleteContact = function (button) {
        const tr = button.parentElement.parentElement;
        const email = tr.children[2].textContent;
        const index = contacts.findIndex(contact => contact.email === email);
        contacts.splice(index, 1);
        tr.parentElement.removeChild(tr);
        updateSno();
        updateTableVisibility();
    };

    window.editContact = function (button) {
        const tr = button.parentElement.parentElement;
        const name = tr.children[1].textContent;
        const email = tr.children[2].textContent;
        const phone = tr.children[3].textContent;
        const address = tr.children[4].textContent;

        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('phone').value = phone;
        document.getElementById('address').value = address;

        deleteContact(button);
    };

    function updateSno() {
        const rows = document.querySelectorAll('#contact-list tr');
        rows.forEach((row, index) => {
            row.children[0].textContent = index + 1;
        });
        contactCount = rows.length;
    }

    function updateTableVisibility() {
        if (contacts.length > 0) {
            contactTable.style.display = 'table';
            noContacts.style.display = 'none';
        } else {
            contactTable.style.display = 'none';
            noContacts.style.display = 'block';
        }
    }
});
