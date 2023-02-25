import products from "../data/products";
import { listCartType } from "../reducers/listCart";

const cartFunctions = (listCart: listCartType[]) => {
    return {
        productsInTheCart: productList(listCart),
        productsToOrder: productsToOrder(productList(listCart)),
        suggestedProducts: suggestedProducts(listCart),
        amountItensInTheCart: amount(productList(listCart)),
        subTotal: subtotal(productList(listCart))
    }
}

const productList = (listCart: listCartType[]) => {
    const filteredProducts = products.filter( item => {
        return listCart.find(filter => filter.id === item.id) !== undefined;
    })

    const dataProducts = filteredProducts.map(product => {
        const selectedProduct = listCart.find(item => item.id === product.id);
        if(selectedProduct) {
            return { ...product, amount: selectedProduct.amount }
        } else {
            return { ...product, amount: 1 }
        }
    })

    return dataProducts
}

const productsToOrder = (productsInTheCart: any) => {
    let productsToOrder: any = []

    productsInTheCart.map((item: any) => {
        const { img, price: currentPrice, ...products } = item
        productsToOrder.push({...products, currentPrice})
    })

    return productsToOrder
}

const suggestedProducts = (listCart: listCartType[]) => {
    return products.filter(item => {
        return listCart.every(filter => filter.id !== item.id);
    })
}

const amount = (productsInTheCart: any) => {
    return productsInTheCart.reduce((acc: any, item: any) => {
        return acc + item.amount
    }, 0)
}

const subtotal = (productsInTheCart: any ) => {
    return productsInTheCart.reduce((acc: any, item: any) => {
        return acc + (item.price * item.amount)
    }, 0)
}

export default cartFunctions