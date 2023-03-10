import { Candy, CandyInCart } from './types'
import { candysInCartEl, placeOrderEl, scoopsInCartEls, tableContentEl, totalPriceEl } from './elements'
import { apiUrl } from './api'

// funktion för att lägga till candys, används endast av buy-btn och buy-view-btn
export const addToCart = (candy: Candy, candysInCart: CandyInCart[]) => {
	const foundCandy = candysInCart.find(c => c.candy.id === candy.id)
	if (foundCandy) {
		foundCandy.show = true
		scoop(foundCandy, 1)
		document.querySelector(`#candy-${candy.id}`)?.classList.remove('d-none')
		document.querySelector(`#delete-${candy.id}`)?.classList.add('d-none')
		document.querySelector(`#remove-${candy.id}`)?.classList.remove('d-none')
	} else {
		const newCandy: CandyInCart = {candy: candy, in_cart: 1, show: true}
		newCandy.candy.stock_quantity--
		candysInCart.push(newCandy)
		renderCandyInCart(newCandy)
		updateInStock(newCandy.candy.id, newCandy.candy.stock_quantity)
		setCandyInCartListeners(candysInCart)
	}
	updateCart(candysInCart)
}

export const renderCandyInCart = (candy: CandyInCart) => {
	tableContentEl.innerHTML += `
		<tr scope="row" id="candy-${candy.candy.id}" class="${candy.show ? '' : 'd-none'}">
			<td><img src="${apiUrl}/${candy.candy.images.thumbnail}" class="card d-none d-sm-inline" alt="${candy.candy.name}"></td>
			<td>
				${candy.candy.name}<br>
				<span class="in-stock-${candy.candy.id} badge bg-success d-inherit">${candy.candy.stock_quantity} left in stock</span>
			</td>
			<td class="text-center text-nowrap">
				<span id="delete-${candy.candy.id}" class="badge bg-danger ${candy.in_cart > 0 ? 'd-none' : ''}"><i class="fa-solid fa-trash-can"></i></span>
				<span id="remove-${candy.candy.id}" class="badge bg-danger ${candy.in_cart > 0 ? '' : 'd-none'}">-</span>
				<span id="in-cart-${candy.candy.id}" class="badge bg-warning">${candy.in_cart}</span>
				<span id="add-${candy.candy.id}" class="badge bg-success">+</span>
				<span id="max-${candy.candy.id}" class="badge bg-secondary d-none"><i class="fa-solid fa-xmark" title="Out of stock"></i></span>
			</td>
			<td class="text-center text-nowrap">${candy.candy.price} kr</td>
			<td class="text-center text-nowrap"><span id="total-${candy.candy.id}">${candy.candy.price * candy.in_cart}</span> kr</td>
		</tr>
	`
}

// funktion för att lägga till klickevent på alla candys
export const setCandyInCartListeners = (candysInCart: CandyInCart[]) => {	
	candysInCart.forEach(candy => {
		document.querySelector(`#add-${candy.candy.id}`)?.addEventListener('click', () => {
			scoop(candy, 1)
			updateCart(candysInCart)
			if (candy.in_cart > 0) {
				document.querySelector(`#delete-${candy.candy.id}`)?.classList.add('d-none')
				document.querySelector(`#remove-${candy.candy.id}`)?.classList.remove('d-none')
				placeOrderEl.classList.remove('d-none')
			}
			if (candy.candy.stock_quantity === 0) {
				document.querySelector(`#add-${candy.candy.id}`)?.classList.add('d-none')
				document.querySelector(`#max-${candy.candy.id}`)?.classList.remove('d-none')
			}
		})
		document.querySelector(`#remove-${candy.candy.id}`)?.addEventListener('click', () => {
			scoop(candy, -1)
			updateCart(candysInCart)
			if (candy.in_cart === 0) {
				document.querySelector(`#remove-${candy.candy.id}`)?.classList.add('d-none')
				document.querySelector(`#delete-${candy.candy.id}`)?.classList.remove('d-none')
				if (countScoops(candysInCart) === 0) {
					placeOrderEl.classList.add('d-none')
				}
			}
			if (candy.in_cart < candy.candy.stock_quantity) {
				document.querySelector(`#max-${candy.candy.id}`)?.classList.add('d-none')
				document.querySelector(`#add-${candy.candy.id}`)?.classList.remove('d-none')
			}
		})
		document.querySelector(`#delete-${candy.candy.id}`)?.addEventListener('click', () => {
			candy.show = false
			updateCart(candysInCart)
			document.querySelector(`#candy-${candy.candy.id}`)?.classList.add('d-none')
		})
	})
}

// funktion för att lägga till eller ta bort scoops
const scoop = (candy: CandyInCart, amount: number) => {
	candy.in_cart = candy.in_cart + amount
	candy.candy.stock_quantity = candy.candy.stock_quantity - amount
	const total = candy.candy.price * candy.in_cart
	document.querySelector(`#in-cart-${candy.candy.id}`)!.innerHTML = String(candy.in_cart)
	document.querySelector(`#total-${candy.candy.id}`)!.innerHTML = String(total)
	updateInStock(candy.candy.id, candy.candy.stock_quantity)
}

// funktion för att uppdatera alla element som innehåller eller är relaterat till stock-värde
export const updateInStock = (candyId: number, inStock: number) => {
	document.querySelectorAll(`.in-stock-${candyId}`).forEach(el => {
		if (inStock > 0) {
			el.classList.remove('bg-danger')
			el.classList.add('bg-success')
			el.innerHTML = `${inStock} left in stock`
		} else {
			el.classList.remove('bg-success')
			el.classList.add('bg-danger')
			el.innerHTML = 'Sold out'
		}
	})
	const buyBtnEl = document.querySelector(`#buy-${candyId}`) as HTMLButtonElement
	const buyViewBtnEl = document.querySelector(`#buy-view-${candyId}`) as HTMLButtonElement
	if (inStock > 0) {
		document.querySelector(`#max-${candyId}`)?.classList.add('d-none')
		document.querySelector(`#add-${candyId}`)?.classList.remove('d-none')
		buyBtnEl.disabled = false
		buyViewBtnEl.disabled = false
	} else {
		document.querySelector(`#add-${candyId}`)?.classList.add('d-none')
		document.querySelector(`#max-${candyId}`)?.classList.remove('d-none')
		buyBtnEl.disabled = true
		buyViewBtnEl.disabled = true
	}
}

//funktion för att räkna alla scoops i hela carten
export const countScoops = (candysInCart: CandyInCart[]) => {
	return candysInCart.reduce((sum, a) => sum + a.in_cart, 0)
}

//funktion för att räkna ut totalpriset i hela carten
export const countTotalPrice = (candysInCart: CandyInCart[]) => {
	let totalPrice = 0
	candysInCart.forEach(candy => {
		totalPrice += candy.candy.price * candy.in_cart
	})
	return totalPrice
}

//funktion för att uppdatera hela carten (localStorage och element med amount och prices)
export const updateCart = (candysInCart: CandyInCart[]) => {
	localStorage.setItem('candys-in-cart', JSON.stringify(candysInCart))

	const scoops = countScoops(candysInCart)
	scoopsInCartEls.forEach(el => el.innerHTML = String(scoops))
	candysInCartEl.innerHTML = String(candysInCart.filter(c => c.show).length)
	totalPriceEl.innerHTML = String(countTotalPrice(candysInCart))
}