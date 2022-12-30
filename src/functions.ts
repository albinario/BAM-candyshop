import { Candy, CandyInCart } from './types'
import { candysInCartEl, scoopsInCartEls, tableContentEl, totalPriceEl } from './elements'
import { apiUrl } from './api'

// funktion för att lägga till candys, används endast av buy-btn och buy-view-btn
export const addToCart = (candysInCart: CandyInCart[], candy: Candy) => {
	const foundCandy = candysInCart.find(c => c.candy.id === candy.id)
	if (foundCandy) {
		scoop(foundCandy, 1)
	} else {
		const newCandy: CandyInCart = {candy: candy, amount: 1}
		candysInCart.push(newCandy)
		renderCandyInCart(newCandy)
		setCandyInCartListeners(candysInCart)
	}
	updateCart(candysInCart)
}

export const renderCandyInCart = (candy: CandyInCart) => {
	tableContentEl.innerHTML += `
		<tr scope="row" id="candy-${candy.candy.id}">
			<td><img src="${apiUrl}/${candy.candy.images.thumbnail}" class="card d-none d-sm-inline" alt="${candy.candy.name}"></td>
			<td>${candy.candy.name}</td>
			<td class="text-center text-nowrap">
				<span id="delete-${candy.candy.id}" class="badge bg-danger ${candy.amount === 0 ? '' : 'd-none'}"><i class="fa-solid fa-trash-can"></i></span>
				<span id="remove-${candy.candy.id}" class="badge bg-danger ${candy.amount === 0 ? 'd-none' : ''}">-</span>
				<span id="amount-${candy.candy.id}" class="badge bg-warning">${candy.amount}</span>
				<span id="add-${candy.candy.id}" class="badge bg-success">+</span>
			</td>
			<td class="text-center text-nowrap">${candy.candy.price} kr</td>
			<td id="total-${candy.candy.id}" class="text-center text-nowrap">${candy.candy.price * candy.amount} kr</td>
		</tr>
	`
}

//funktion för att lägga till klickevent på alla candys
export const setCandyInCartListeners = (candysInCart: CandyInCart[]) => {
	candysInCart.forEach(candy => {
		document.querySelector(`#add-${candy.candy.id}`)?.addEventListener('click', () => {
			scoop(candy, 1)
			updateCart(candysInCart)
			if (candy.amount > 0) {
				document.querySelector(`#remove-${candy.candy.id}`)?.classList.remove('d-none')
				document.querySelector(`#delete-${candy.candy.id}`)?.classList.add('d-none')
			}
		})
		document.querySelector(`#remove-${candy.candy.id}`)?.addEventListener('click', () => {
			scoop(candy, -1)
			updateCart(candysInCart)
			if (candy.amount === 0) {
				document.querySelector(`#remove-${candy.candy.id}`)?.classList.add('d-none')
				document.querySelector(`#delete-${candy.candy.id}`)?.classList.remove('d-none')
			}
		})
		document.querySelector(`#delete-${candy.candy.id}`)?.addEventListener('click', () => {
			candysInCart.splice(candysInCart.indexOf(candy), 1)
			updateCart(candysInCart)
			document.querySelector(`#candy-${candy.candy.id}`)?.classList.add('d-none')
		})
	})
}

//funktion för att lägga till eller ta bort scoops
const scoop = (candy: CandyInCart, amount: number) => {
	candy.amount = candy.amount + amount
	const total = candy.candy.price * candy.amount
	document.querySelector(`#amount-${candy.candy.id}`)!.innerHTML = String(candy.amount)
	document.querySelector(`#total-${candy.candy.id}`)!.innerHTML = String(total)
}

//funktion för att räkna alla scoops i hela carten
const countScoops = (candysInCart: CandyInCart[]) => {
	return candysInCart.reduce((sum, a) => sum + a.amount, 0)
}

//funktion för att räkna ut totalpriset i hela carten
const countTotalPrice = (candysInCart: CandyInCart[]) => {
	let totalPrice = 0
	candysInCart.forEach(candy => {
		totalPrice += candy.candy.price * candy.amount
	})
	return totalPrice
}

//funktion för att uppdatera hela carten (localStorage och element med amount och prices)
export const updateCart = (candysInCart: CandyInCart[]) => {
	localStorage.setItem('candys-in-cart', JSON.stringify(candysInCart))
	scoopsInCartEls.forEach(el => el.innerHTML = String(countScoops(candysInCart)))
	candysInCartEl.innerHTML = String(candysInCart.length)
	totalPriceEl.innerHTML = String(countTotalPrice(candysInCart))
}