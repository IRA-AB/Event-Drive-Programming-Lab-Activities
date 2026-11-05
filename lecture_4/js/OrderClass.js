class OrderClass {
    constructor() {
        this.subscribers = [];
    }
    subscribe(callback) {
        this.subscribers.push(callback);
    }
    publish(order) {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i](order);
        }
    }
}