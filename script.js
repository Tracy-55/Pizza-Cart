function pizzaCart() {
    return {
        smallQuantity: 0,
        mediumQuantity: 0,
        largeQuantity: 0,
        cart: [],
        totalCost: 0,
        isCheckingOut: false,
        paymentAmount: 0,
        checkoutMessage: '',
        addToCart(size, quantity, price) {
            let existingItem = this.cart.find(item => item.size === size);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.cart.push({ size, quantity, price });
            }
            this.calculateTotalCost();
        },
        removeFromCart(size) {
            let existingItem = this.cart.find(item => item.size === size);
            if (existingItem) {
                existingItem.quantity--;
                if (existingItem.quantity <= 0) {
                    this.cart = this.cart.filter(item => item.size !== size);
                }
            }
            this.calculateTotalCost();
        },
        calculateTotalCost() {
            this.totalCost = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        checkout() {
            this.isCheckingOut = true;
        },
        processPayment() {
            if (this.paymentAmount < this.totalCost) {
                this.checkoutMessage = 'Sorry that is not enough money! Enter the required amount.';
            } else {
                this.checkoutMessage = `Enjoy your Pizza! Your change is R${(this.paymentAmount - this.totalCost).toFixed(2)}`;
                this.resetCart();
            }
        },
        resetCart() {
            this.cart = [];
            this.totalCost = 0;
            this.isCheckingOut = false;
            this.paymentAmount = 0;
        }
    }
}
