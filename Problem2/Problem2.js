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
    let newProductsMap = {}
    let id = 1
    arrayOfProducts.forEach(item => {
        let newObj = {}
        if (!idArray.includes(item.category.id)) {
            newObj = { category: { id: item.category.id, name: item.category.name }, product: [] }
            newObj.product.push(item)
            newProductsMap[id] = newObj
            idArray.push(item.category.id)
            id++;
        } else {
            idArray.forEach(id => {
                if (id === item.category.id) {
                    newProductsMap[idArray.indexOf(id) + 1].product.push(item)
                }
            })
        }
    })
    return Object.values(newProductsMap);
}

const transformPrices = arrayOfProducts => {
    return getCurrency().then(data => {
        arrayOfProducts.map(items => {
            return items.product[0].price = items.product[0].price * data.result
        })
        console.log(arrayOfProducts)
    })
}

getProduct()
.then(data => {
    console.log(data)
})
.catch(err => { 
    console.log(err)
})

