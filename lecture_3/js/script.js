function getUser() {

    console.log("Getting user...");

    return new Promise(function(resolve) {

        setTimeout(function() {

            resolve({

                id: 1,
                name: "Juan Dela Cruz",
                email: "juandelacruz@domain.com"

            });
        }, 2000);
    });
}

function getOrders(userID) {

    console.log("Getting orders for user " + userID);

    return new Promise(function(resolve) {

        setTimeout(function() {

            resolve([

                { product: "Burger", price: 50 },
                { product: "Fries", price: 40 },
                { product: "Soda", price: 25 }

            ]);
        }, 2000);
    });
}

async function displayData() {

    const user = await getUser();

    console.log("User: ", user);

    const orders = await getOrders(user.id);

    console.log("Orders: ", orders);

    let total = 0;
    for (let i = 0; i < orders.length; i++) {
        total = total + orders[i].price;
    }
    console.log("Total: " + total);
}
console.log("Start...");
displayData();
console.log("End...");