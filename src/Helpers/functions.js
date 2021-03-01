export const addCart = async(
    id,
    quantity,
    productImage,
    productName,
    productSize,
    productColor,
    productPrice,
    productSizes
) => {
    try {
        if (localStorage["guestToken"]) {
            const productDetails = {
                productId: id,
                quantity: quantity,
                image: productImage,
                name: productName,
                size: productSize,
                color: productColor,
                price: parseInt(productPrice),
                sizeFromClient: productSizes,
                userId: localStorage["guestToken"],
            };
            let response = await fetch(
                `http://localhost:3003/cart/check-out-as-guest`, {
                    method: "POST",
                    body: JSON.stringify(productDetails),
                    headers: {
                        "Content-Type": "Application/json",
                    },
                }
            );
            if (response.ok) {
                const createPriceResponse = await fetch(
                    "http://localhost:3003/payment/create-product-price", {
                        method: "POST",
                        body: JSON.stringify({
                            userId: localStorage["guestToken"],
                            productName: productName,
                            productPrice: parseInt(productPrice * 100),
                            productId: id,
                            quantity: this.state.quantity,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (createPriceResponse.ok) {
                    this.setState({ alert: true });
                    setTimeout(() => {
                        this.setState({
                            alert: false,
                        });
                    }, 1200);
                }
            } else {
                this.setState({ errorAlert: true });
                setTimeout(() => {
                    this.setState({
                        errorAlert: false,
                    });
                }, 1200);
            }
        } else if (localStorage["userId"]) {
            const productDetails = {
                productId: id,
                quantity: this.state.quantity,
                image: productImage,
                name: productName,
                size: productSize,
                color: productColor,
                price: parseInt(productPrice),
                sizeFromClient: productSizes,
                userId: localStorage["userId"],
            };
            let response = await fetch(
                `http://localhost:3003/cart/check-out-as-guest`, {
                    method: "POST",
                    body: JSON.stringify(productDetails),
                    headers: {
                        "Content-Type": "Application/json",
                    },
                }
            );
            if (response.ok) {
                const createPriceResponse = await fetch(
                    "http://localhost:3003/payment/create-product-price", {
                        method: "POST",
                        body: JSON.stringify({
                            userId: localStorage["userId"],
                            productName: productName,
                            productPrice: parseInt(productPrice * 100),
                            productId: id,
                            quantity: this.state.quantity,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (createPriceResponse.ok) {
                    this.setState({ alert: true });
                    setTimeout(() => {
                        this.setState({
                            alert: false,
                        });
                    }, 1200);
                }
            } else {
                this.setState({ errorAlert: true });
                setTimeout(() => {
                    this.setState({
                        errorAlert: false,
                    });
                }, 1200);
            }
        }
    } catch (err) {
        console.log(err);
    }
};