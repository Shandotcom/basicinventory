// Select DOM elements
const submitBtn = document.getElementById('submitBtn');
const viewToggle = document.getElementById('viewToggle');
const table = document.getElementById('inventoryTable');
const tableBody = document.getElementById('tableBody');
const itemNameInput = document.getElementById('itemName');
const itemQtyInput = document.getElementById('itemQty');

// 1. Toggle Table Visibility
viewToggle.addEventListener('change', () => {
    table.style.display = viewToggle.checked ? 'table' : 'none';
});

// 2. Add New Items to the Table
submitBtn.addEventListener('click', () => {
    const name = itemNameInput.value.trim();
    const qty = itemQtyInput.value.trim();

    // Basic validation
    if (name === '' || qty === '') {
        alert("Please provide both an Item name and a Quantity.");
        return;
    }

    // Create a new table row
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td class="qty-cell">${qty}</td>
    `;

    tableBody.appendChild(row);

    // Reset input fields
    itemNameInput.value = '';
    itemQtyInput.value = '';
});

// 3. Double-Click to Modify Quantity
tableBody.addEventListener('dblclick', (e) => {
    // Check if the double-clicked element is a quantity cell
    if (e.target.classList.contains('qty-cell')) {
        const cell = e.target;
        const currentQty = cell.innerText;

        // If an input is already present, don't create another one
        if (cell.querySelector('input')) return;

        // Create an input field
        const input = document.createElement('input');
        input.type = 'number';
        input.value = currentQty;
        input.className = 'edit-input';

        // Clear cell text and add the input
        cell.innerText = '';
        cell.appendChild(input);
        input.focus();

        // Helper function to save changes
        const saveEdit = () => {
            const newValue = input.value;
            cell.innerText = newValue !== '' ? newValue : currentQty;
        };

        // Save on Enter key
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                saveEdit();
            }
        });

        // Save on clicking away (blur)
        input.addEventListener('blur', () => {
            saveEdit();
        });
    }
});