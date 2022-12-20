import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { fetchCandy, Candy } from './api'

//fetchCandy()
//let candyArr: ICandy[] = []
const getCandy = await fetchCandy()
console.log('candyArray:', getCandy)
let candyArr: Candy[] = getCandy.data  
console.log('my array', candyArr)

document.querySelector('main')!.innerHTML = candyArr.map(candy => `
<div class ="col-6 col-md-4 col-lg-3 my-2">  
    <div class="card">
        <img src="https://www.bortakvall.se/${candy.images.thumbnail}" class="card-img-top" alt="...">
        <div class="card-body"> 
           <h5 class="card-title">${candy.name}</h5>
            <p class="card-text">${candy.price} SEK</p>
            <div class="d-flex justify-content-between">
                <button href="#" class="btn btn-primary"><i class="fa-regular fa-eye"></i> view</button>
                <button href="#" class="btn btn-success"><i class="fa-solid fa-cart-shopping"></i> buy</button>
            </div>
        </div>
    </div>
</div>
`).join("")


