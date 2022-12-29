import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './style.css'
import { apiUrl, getCandys } from './api'
import { Candy } from './types'
import { updateCart, renderCandyInCart } from './functions'
import { mainEl, inCartEls, popupCloseEl, popupEl, cartBtnEl, candyCountEl } from './elements'

const candys = await getCandys()
const candysArr: Candy[] = candys.data
candysArr.sort((a, b) => a.name.localeCompare(b.name))

// candysArr.forEach(candy => )

//filter
const candyInStock = candysArr.filter(candy => candy.stock_quantity > 0)
// const outOfStock = candysArr.filter(candy => candy.stock_status === 'outofstock')
// console.log('out of stock', outOfStock);
	
candyCountEl.innerHTML = `<p>🍭🍬🍫 ${candyInStock.length} available candys in stock out of ${candysArr.length} candys in a candy dream world 🍭🍬🍫</p>`



mainEl.innerHTML = candysArr.map(candy => `
	<div class="col-6 col-md-4 col-lg-3">
		<div class="card my-2">
			<img src="${apiUrl}/${candy.images.thumbnail}" class="card-img-top sold-out-parent" alt="${candy.name}">
			<p class="sold-out p-1">${!candy.stock_quantity ? '<span class="badge bg-danger">Sold out</span>'  : ''}</p>
			<div class="card-body text-center">
				<p class="card-title">${candy.name}</p>
				<p class="card-text"><i class="fa-solid fa-piggy-bank"></i> ${candy.price} sek</p>
				<div class="d-flex justify-content-between">
					<button class="btn btn-warning" aria-label="view-candy" type="button" data-bs-toggle="modal" data-bs-target="#view-${candy.id}"><i class="fa-regular fa-eye"></i><span class="d-none d-sm-inline"> View</span></button>
					<span> ${candy.stock_quantity ? `<button id="buy-${candy.id}" class="buy-btn btn btn-success" aria-label="buy-candy"> <i class="fa-solid fa-plus"></i> Buy</button>` : `<button id="buy-${candy.id}" class="buy-btn btn btn-success" aria-label="buy-candy" disabled> <i class="fa-solid fa-plus"></i> Buy</button>`} </span>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="view-${candy.id}" tabindex="-1" aria-labelledby="modal-label" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<p class="modal-title fs-5" id="modal-label">${candy.name}</p>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body sold-out-parent">
				<p class="sold-out p-1">${!candy.stock_quantity ? '<span class="badge bg-danger">Sold out</span>' : ''}</p>
					<img src="${apiUrl}/${candy.images.large}" alt="${candy.name}">
					${candy.description}
					<p class="fw-bold"><i class="fa-solid fa-piggy-bank"></i> ${candy.price} sek</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<span>${candy.stock_quantity ? `<button type="button" id="buy-view-${candy.id}"  class="btn btn-success" aria-label="buy-candy"><i class="fa-solid fa-plus"></i> Buy</button>` : `<button type="button" id="buy-view-${candy.id}"  class="btn btn-success" disabled aria-label="buy-candy"><i class="fa-solid fa-plus"></i> Buy</button>`} </span>
				</div>
			</div>
		</div>
	</div>
`
)
.join('')

const storedCandys = localStorage.getItem('in-cart') ?? '[]'
const candysInCart: Candy[] = JSON.parse(storedCandys)
if (candysInCart.length){
	inCartEls.forEach(el => el.innerHTML = String(candysInCart.length))
	candysInCart.forEach(candy => renderCandyInCart(candy))
}

candysArr.forEach(candy => {
	document.querySelector(`#buy-${candy.id}`)?.addEventListener('click', () => {
		updateCart(candysInCart, candy)
	})
	document.querySelector(`#buy-view-${candy.id}`)?.addEventListener('click', () => {
		updateCart(candysInCart, candy)
	})
})

cartBtnEl.addEventListener("click", () => {
	popupEl.classList.remove("d-none")
})

popupCloseEl.addEventListener("click", () => {
	popupEl.classList.add("d-none")
})



// candysArr.forEach(candy => {
// 	if (candy.stock_quantity < 1) {
// 		buyBtn.setAttribute('disabled', 'true')
// 	}
// })

// buyBtn.forEach(button => {
// 	candysArr.forEach(candy => {
// 		if (!candy.stock_status) {
// 			button.setAttribute('disabled', 'true')
// 		}


// 	})

// })



