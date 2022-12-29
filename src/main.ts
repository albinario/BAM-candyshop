import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './style.css'
import { apiUrl, getCandys } from './api'
import { Candy, CandyInCart } from './types'
import { shuffleArray, addToCart, renderCandyInCart, updateInCartEls } from './functions'
import { headerEl, mainEl, cartBtnEl, popupCloseEl, popupEl } from './elements'

const candys = await getCandys()
const candysArr: Candy[] = candys.data
shuffleArray(candysArr)

mainEl.innerHTML = candysArr.map(candy => `
	<div class="col-6 col-md-4 col-lg-3">
		<div class="card my-2">
			<img src="${apiUrl}/${candy.images.thumbnail}" class="card-img-top" alt="${candy.name}">
			<div class="card-body text-center">
				<p class="card-title">${candy.name}</p>
				<p class="card-text"><i class="fa-solid fa-piggy-bank"></i> ${candy.price} sek</p>
				<div class="d-flex justify-content-between">
					<button class="btn btn-warning" aria-label="view-candy" type="button" data-bs-toggle="modal" data-bs-target="#view-${candy.id}"><i class="fa-regular fa-eye"></i><span class="d-none d-sm-inline"> View</span></button>
					<button id="buy-${candy.id}" class="btn btn-success" aria-label="buy-candy"><i class="fa-solid fa-plus"></i> Buy</button>
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
				<div class="modal-body">
					<img src="${apiUrl}/${candy.images.large}" alt="${candy.name}">
					${candy.description}
					<p class="fw-bold"><i class="fa-solid fa-piggy-bank"></i> ${candy.price} sek</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" id="buy-view-${candy.id}"  class="btn btn-success" aria-label="buy-candy"><i class="fa-solid fa-plus"></i> Buy</button>
				</div>
			</div>
		</div>
	</div>
`)
.join('')

const storedCandys = localStorage.getItem('in-cart') ?? '[]'
const candysInCart: CandyInCart[] = JSON.parse(storedCandys)
if (candysInCart.length) {
	updateInCartEls(candysInCart)
	candysInCart.forEach(candy => renderCandyInCart(candy))
}

candysArr.forEach(candy => {
	document.querySelector(`#buy-${candy.id}`)?.addEventListener('click', () => {
		addToCart(candysInCart, candy)
	})
	document.querySelector(`#buy-view-${candy.id}`)?.addEventListener('click', () => {
		addToCart(candysInCart, candy)
	})
})

cartBtnEl.addEventListener('click', () => {
	popupEl.classList.remove('d-none')
	headerEl.classList.remove('sticky-top')
})

popupCloseEl.addEventListener('click', () => {
	popupEl.classList.add('d-none')
	headerEl.classList.add('sticky-top')
})