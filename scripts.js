let productList =[];
let carrito = [];
let total = 0 ;

function add(productId, price){

    const product = productList.find(p => p.id === productId);
    product.stock--;



    console.log(productId, price);
    carrito.push(productId);
    total = total+price;

    document.getElementById("checkout").innerHTML= `Pagar $${total}` ;
    displayProducts();
}
async function pay(){
    const productList = await (await fetch("/api/pay",{
        method: "post",
        body: JSON.stringify(carrito),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();
    //window.alert(products.join(",\n"));
}

function displayProducts(){
    let productsHTML = '';
    productList.forEach(p => {
        let buttonHTML= ` <button class="button-add" onclick="add(${p.id}, ${p.price})">AGREGAR</button>`;

        if(p.stock <= 0){
            buttonHTML= ` <button disabled class="button-add disabled" onclick="add(${p.id}, ${p.price})">sin stock</button>`;

        }

        productsHTML +=
    ` <div class="product-container">
       <h3>${p.name}</h3>
       <img src="${p.image}"/>
       <h2>$${p.price}</h2>
       ${buttonHTML}
  </div>`
   
    });
    document.getElementById('page-content').innerHTML = productsHTML;
}

window.onload = async() =>{
    
    productList = await (await fetch("/api/products")).json();
    console.log(productList);
    displayProducts();
}