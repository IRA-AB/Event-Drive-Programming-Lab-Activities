const orderClass = new OrderClass();
for (let i = 0; i < 10; i++) {
    orderClass.subscribe(function(order) {
        console.log("User " + (i + 1) + " received: ", order);
    });
}
function getOrders() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve({
                id: 101,
                product: "Burger",
                price: 50,
                status: "Delivered"
            });
        }, 1000);
    });
}

async function processOrder() {
    console.log("Getting order");
    const order = await getOrders();
    console.log("Order received: ", order);
    orderClass.publish(order);
}
processOrder();