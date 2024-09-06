function getJwtToken() {
    return localStorage.getItem('jwtToken');
}

async function fetchItems(orderNo) {
    try {
        const response = await fetch(`/orders/${orderNo}/items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwtToken()}`
            }
        });
        if (response.ok) {
            const items = await response.json();
            updateUI(items);
        } else {
            console.error('Failed to fetch items');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addItem(orderNo, newItem) {
    try {
        const response = await fetch(`/orders/${orderNo}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwtToken()}`
            },
            body: JSON.stringify(newItem)
        });
        if (response.ok) {
            const addedItem = await response.json();
            addItemToUI(addedItem);
        } else {
            console.error('Failed to add item');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateItem(orderNo, itemNo, updatedItem) {
    try {
        const response = await fetch(`/orders/${orderNo}/items/${itemNo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwtToken()}`
            },
            body: JSON.stringify(updatedItem)
        });
        if (response.ok) {
            const updatedItemFromServer = await response.json();
            updateItemInUI(updatedItemFromServer);
        } else {
            console.error('Failed to update item');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteItem(orderNo, itemNo) {
    try {
        const response = await fetch(`/orders/${orderNo}/items/${itemNo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwtToken()}`
            }
        });
        if (response.ok) {
            removeItemFromUI(itemNo);
        } else {
            console.error('Failed to delete item');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
