const API_URL = 'https://api.escuelajs.co/api/v1/products';
const API_currency_URL = 'https://api.exchangerate.host/convert?from=USD&to=EGP';

const getProduct = async () => {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const jsonResponse = await response.json();
          return jsonResponse;
        }
    }
    catch (error) {
        console.log(error);
    }
}

const getCurrency = async () => {
    try {
        const response = await fetch(API_currency_URL);
        if (response.ok) {
          const jsonResponse = await response.json();
          return jsonResponse;
        }
    }
    catch (error) {
        console.log(error);
    }
}

const categorize = arrayOfProducts => {
    let idArray = []
    let newProductsArray = []
    arrayOfProducts.forEach(item => {
        if (!idArray.includes(item.category.id)) {
            let newObj = {}
            newObj = { category: { id: item.category.id, name: item.category.name }, product: [] }
            newObj.product.push(item)
            newProductsArray.push(newObj)
            idArray.push(item.category.id)
        }
    })
    return newProductsArray;
}

const transformPrices =  arrayOfProducts => {
    return getCurrency().then(data => {
        arrayOfProducts.map(items => {
            return items.product[0].price = items.product[0].price * data.result
        })
        console.log(arrayOfProducts)
    })
}

getProduct()
.then(data => {
    transformPrices(categorize(data))
})
.catch(err => { 
    console.log(err)
})

