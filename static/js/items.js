// Змінна, що визначає, чи додається новий item, чи редагується існуючий
let isNewItem = true;
let currentItemNo = null; // Змінна для збереження itemNo поточного елементу

// Функція для отримання items для конкретного замовлення
function fetchItems(orderNo) {
    // Симуляція запиту до сервера
    fetch(`http://localhost:8080/api/orders/${orderNo}/items`)
        .then(response => response.json())
        .then(items => {
            updateUI(items); // Оновлення UI з отриманими даними
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
}

// Функція для додавання нового item
function addItem(orderNo, itemData) {
    fetch(`http://localhost:8080/api/orders/${orderNo}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
    })
    .then(response => response.json())
    .then(item => {
        addItemToUI(item); // Додавання нового item до UI
    })
    .catch(error => {
        console.error('Error adding item:', error);
    });
}

// Функція для оновлення існуючого item
function updateItem(orderNo, itemNo, itemData) {
    fetch(`http://localhost:8080/api/orders/${orderNo}/items/${itemNo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
    })
    .then(response => response.json())
    .then(item => {
        updateItemInUI(item); // Оновлення item в UI
    })
    .catch(error => {
        console.error('Error updating item:', error);
    });
}

// Функція для видалення item
function deleteItem(orderNo, itemNo) {
    fetch(`http://localhost:8080/api/orders/${orderNo}/items/${itemNo}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            removeItemFromUI(itemNo); // Видалення item з UI
        } else {
            console.error('Error deleting item:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error deleting item:', error);
    });
}

// Функція для завантаження даних item у форму для редагування
function editItem(itemNo) {
    fetch(`http://localhost:8080/api/orders/${orderNo}/items/${itemNo}`)
        .then(response => response.json())
        .then(item => {
            document.getElementById('partNo').value = item.partNo;
            document.getElementById('profilWidth').value = item.profilWidth;
            document.getElementById('width').value = item.width;
            document.getElementById('height').value = item.height;
            document.getElementById('qty').value = item.qty;
            document.getElementById('sellPrice').value = item.sellPrice;
            document.getElementById('discount').value = item.discount;
            document.getElementById('onHand').value = item.onHand;
            document.getElementById('cost').value = item.cost;

            // Встановлюємо режим редагування
            isNewItem = false;
            currentItemNo = itemNo;
        })
        .catch(error => {
            console.error('Error fetching item:', error);
        });
}

// Оновлення UI з новими даними
function updateUI(items) {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = ''; // Очищуємо список перед відображенням нових даних

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <p>Item No: ${item.id.itemNo}</p>
            <p>Part No: ${item.partNo}</p>
            <p>Width: ${item.width}</p>
            <p>Height: ${item.height}</p>
            <button onclick="editItem(${item.id.itemNo})">Edit</button>
            <button onclick="deleteItem(${orderNo}, ${item.id.itemNo})">Delete</button>
        `;
        itemsList.appendChild(itemDiv);
    });
}

// Додавання нового item до UI
function addItemToUI(item) {
    const itemsList = document.getElementById('itemsList');

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
        <p>Item No: ${item.id.itemNo}</p>
        <p>Part No: ${item.partNo}</p>
        <p>Width: ${item.width}</p>
        <p>Height: ${item.height}</p>
        <button onclick="editItem(${item.id.itemNo})">Edit</button>
        <button onclick="deleteItem(${orderNo}, ${item.id.itemNo})">Delete</button>
    `;
    itemsList.appendChild(itemDiv);
}

// Оновлення існуючого item в UI
function updateItemInUI(item) {
    // Оновлення інформації про item на основі itemNo
    const itemDiv = document.querySelector(`.item:has(button[onclick="editItem(${item.id.itemNo})"])`);
    if (itemDiv) {
        itemDiv.querySelector('p:nth-child(2)').textContent = `Part No: ${item.partNo}`;
        itemDiv.querySelector('p:nth-child(3)').textContent = `Width: ${item.width}`;
        itemDiv.querySelector('p:nth-child(4)').textContent = `Height: ${item.height}`;
    }
}

// Видалення item з UI
function removeItemFromUI(itemNo) {
    const itemDiv = document.querySelector(`.item:has(button[onclick="editItem(${itemNo})"])`);
    if (itemDiv) {
        itemDiv.remove();
    }
}
