let arr = [];

fetch('https://api.escuelajs.co/api/v1/products?categoryId=1')
    .then(response => response.json())
    .then(data => {
        data.forEach(element =>{
            arr.push(element);
        });
    });

console.log(arr);

