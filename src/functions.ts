import { Candy, CandyInCart } from './types'
import { candysInCartEl, scoopsInCartEls, tableContentEl } from './elements'
import { apiUrl } from './api'

export const shuffleArray = (array: Candy[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

export const addToCart = (candysInCart: CandyInCart[], candy: Candy) => {
	const foundCandy = candysInCart.find(c => c.candy.id === candy.id)
	if (foundCandy) {
		scoop(foundCandy, 1)
	} else {
		const newCandy: CandyInCart = {candy: candy, amount: 1}
		candysInCart.push(newCandy)
		renderCandyInCart(newCandy)
	}
	localStorage.setItem('in-cart', JSON.stringify(candysInCart))
	updateInCartEls(candysInCart)
}

export const renderCandyInCart = (candy: CandyInCart) => {
	tableContentEl.innerHTML += `
		<tr scope="row">
			<td><img src="${apiUrl}/${candy.candy.images.thumbnail}" class="card d-none d-sm-inline" alt="${candy.candy.name}"></td>
			<td>${candy.candy.name}</td>
			<td class="text-nowrap">
				<span class="badge bg-danger">-</span>
				<span id="amount-${candy.candy.id}" class="badge bg-warning">${candy.amount}</span>
				<span class="badge bg-success">+</span>
			</td>
			<td class="text-center text-nowrap">${candy.candy.price} kr</td>
			<td id="total-${candy.candy.id}" class="text-center text-nowrap">${candy.candy.price * candy.amount} kr</td>
		</tr>
	`
}

const scoop = (candy: CandyInCart, amount: number) => {
	candy.amount = candy.amount + amount
	const total = candy.candy.price * candy.amount
	document.querySelector(`#amount-${candy.candy.id}`)!.innerHTML = String(candy.amount)
	document.querySelector(`#total-${candy.candy.id}`)!.innerHTML = String(total)
}

const countScoops = (candysInCart: CandyInCart[]) => {
	return candysInCart.reduce((sum, a) => sum + a.amount, 0)
}

export const updateInCartEls = (candysInCart: CandyInCart[]) => {
	scoopsInCartEls.forEach(el => el.innerHTML = String(countScoops(candysInCart)))
	candysInCartEl.innerHTML = String(candysInCart.length)
}