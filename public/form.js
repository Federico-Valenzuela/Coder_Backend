

console.log('socket connection');

const socket = io()

socket.on("Welcome", message=>console.log(message))

/*socket.emit("NewCamiseta",{
        title: "Venezuela",
        photo: "https://tiendafutbol.cl/wp-content/uploads/2019/09/Camiseta-Replica-Deportiva-Selecci%C3%B3n-Venezuela-2019.jpg",
        price: 500,
        stock: 50,
    
})
*/
socket.on("camisetas",(data)=>{
        data = data.map(
                (each)=>`
        <div class="card" style="width: 18rem;">
        <img class="${each.photo}" src="..." alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${each.title}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>)`
        ).join();
        console.log(data)
        document.querySelector("#camiseta").innerHTML = data
})


socket.on("new success",(message)=>console.log(message))
document.querySelector("#newProduct").addEventListener("click",(product)=>{
        product.preventDefault()
        const title = document.querySelector("#title").value;
        const photo = document.querySelector("#photo").value;
        const price = document.querySelector("#price").value;
        const stock = document.querySelector("#stock").value;
        const data = {}
        title && (data.title = title)
        photo && (data.photo = photo)
        price && (data.price = price)
        stock && (data.stock = stock)
        console.log(data)
        socket.emit("NewCamiseta",data)
})
