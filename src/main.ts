import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './style.css'

import { addToCart, renderCandyInCart, updateCart, setCandyInCartListeners, countTotalPrice } from './functions'
import { apiUrl, createOrder, getCandys } from './api'
import { Candy, CandyInCart, OrderedItem } from './types'
import { IOrder } from './interfaces'
import { headerEl, mainEl, cartBtnEl, popupCloseEl, popupEl, candyCountEl, firstNameEl, lastNameEl, addressEl, zipEl, cityEl, emailEl, orderEl, footerEl } from './elements'

const candys = await getCandys()
const candysArr: Candy[] = candys.data
candysArr.sort((a, b) => a.name.localeCompare(b.name))

const candyInStock = candysArr.filter(candy => candy.stock_quantity > 0)
	
candyCountEl.innerHTML = `<p>🍭🍬🍫 ${candyInStock.length} available candies in stock out of ${candysArr.length} candies in a candy dream world 🍭🍬🍫</p>`

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
					<button id="buy-${candy.id}" class="buy-btn btn btn-success" aria-label="buy-candy" ${candy.stock_quantity ? '' : 'disabled'}> <i class="fa-solid fa-plus"></i> Buy</button>
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
					<button id="buy-view-${candy.id}" class="buy-btn btn btn-success" aria-label="buy-candy" ${candy.stock_quantity ? '' : 'disabled'}> <i class="fa-solid fa-plus"></i> Buy</button>
				</div>
			</div>
		</div>
	</div>
`
)
.join('')

const storedCandysInCart = localStorage.getItem('candys-in-cart') ?? '[]'
const candysInCart: CandyInCart[] = JSON.parse(storedCandysInCart)

if (candysInCart.length) {
	updateCart(candysInCart)
	candysInCart.forEach(candy => renderCandyInCart(candy))
	setCandyInCartListeners(candysInCart)
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
	if (candysInCart.length) {
		popupEl.classList.remove('d-none')
		headerEl.classList.remove('sticky-top')
		footerEl.classList.remove('sticky-bottom')
	}
})

popupCloseEl.addEventListener('click', () => {
	popupEl.classList.add('d-none')
	headerEl.classList.add('sticky-top')
	footerEl.classList.add('sticky-bottom')
})

document.querySelector('#place-order')?.addEventListener('submit', async e => {
e.preventDefault()
	const newOrder: IOrder = {
		"customer_first_name": firstNameEl.value,
		"customer_last_name": lastNameEl.value, 
		"customer_address": addressEl.value,
		"customer_postcode": zipEl.value,
		"customer_city": cityEl.value,
		"customer_email": emailEl.value,
		"order_total": countTotalPrice(candysInCart),
		"order_items": candysInCart.map(candy => {
			return {
				"product_id": candy.candy.id,
				"qty": candy.amount,
				"item_price": candy.candy.price,
				"item_total": candy.candy.price * candy.amount
			}
		})
	}

	const createdOrder = await createOrder(newOrder)
	if (createdOrder.status === 'fail') {
		console.log(createdOrder)
		
		orderEl.innerHTML += `<p class="alert alert-danger mt-3">${createdOrder.message}. Your order could not be completed.</p>`
	} else {
		orderEl.innerHTML = `
			<i class="fa-solid fa-handshake"></i>
			<h3>Thank you, ${createdOrder.data.customer_first_name}!</h3>
			<p>Your order ID is <span class="text-bam ms-1 fs-2">${createdOrder.data.id}</span></p>
			<p>Registered at <span class="text-bam">${createdOrder.data.order_date}</span></p>
			<p>We have sent a order confirmation to <span class="text-bam">${createdOrder.data.customer_email}</span></p>
			<p>Have a great day and enjoy your candy soon!</p>
			<div id="ordered-candys" class="img-container my-3"></div>
			<p>❤️ All the best from the staff at</p>
			<img src="logo.svg" alt="BAM Candyshop">
			<div class="img-container my-3">
				<img src="/assets/mans_edenfalk.jpg" alt="Måns Edenfalk" title="Måns Edenfalk" class="card">
				<img src="/assets/bob_oskar_kindgren.jpg" alt="Bob Oskar Kindgren" title="Bob Oskar Kindgren" class="card">
				<img src="/assets/albin_lindeborg.jpg" alt="Albin Lindeborg" title="Albin Lindeborg" class="card">
			</div>
		`
		const orderedCandys: OrderedItem[] = createdOrder.data.items
		orderedCandys.forEach(orderedCandy => {
			const candy = candysArr.find(candy => candy.id === orderedCandy.product_id)
			document.querySelector('#ordered-candys')!.innerHTML += `<img src="${apiUrl}/${candy?.images.thumbnail}" alt="${candy?.name}" class="card" title="${candy?.name}">`
		})
	}
})