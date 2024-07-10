function pizzaCart() {
    return {
        cart: [],
        totals: { small: 0, medium: 0, large: 0 },
        totalCost: 0,
        paymentAmount: 0,
        isCheckingOut: false,
        checkoutMessage: '',
        addToCart(size) {
            let pizzaPrice = { small: 49.99, medium: 79.99, large: 149.99 }[size];
            let existingItem = this.cart.find(item => item.size === size);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cart.push({ size, price: pizzaPrice, quantity: 1 });
            }
            this.updateTotals();
        },
        removeFromCart(size) {
            let index = this.cart.findIndex(item => item.size === size);
            if (index !== -1) {
                if (this.cart[index].quantity > 1) {
                    this.cart[index].quantity--;
                } else {
                    this.cart.splice(index, 1);
                }
                this.updateTotals();
            }
        },
        updateTotals() {
            this.totals.small = this.cart.filter(item => item.size === 'small').reduce((acc, item) => acc + item.quantity, 0);
            this.totals.medium = this.cart.filter(item => item.size === 'medium').reduce((acc, item) => acc + item.quantity, 0);
            this.totals.large = this.cart.filter(item => item.size === 'large').reduce((acc, item) => acc + item.quantity, 0);
            this.totalCost = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        checkout() {
            this.isCheckingOut = true;
        },
        processPayment() {
            if (this.paymentAmount >= this.totalCost) {
                this.checkoutMessage = 'Enjoy your pizzas!';
                this.cart = [];
                this.updateTotals();
            } else {
                this.checkoutMessage = 'Sorry - that is not enough money!';
            }
            setTimeout(() => {
                this.checkoutMessage = '';
                this.isCheckingOut = false;
            }, 3000);
        }
    }
}

