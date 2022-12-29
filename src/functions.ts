import { Candy } from './types'
import { inCartEls, tableContentEl  } from './elements'
import { apiUrl } from './api'

export const updateCart = (candysInCart: Candy[], candy: Candy) => {
	candysInCart.push(candy)
	localStorage.setItem('in-cart', JSON.stringify(candysInCart))
	inCartEls.forEach(el => el.innerHTML = String(candysInCart.length))
	renderCandyInCart(candy)
}

export const renderCandyInCart = (candy: Candy) => {
	tableContentEl.innerHTML += `
		<tr scope="row">
			<td><img src="${apiUrl}/${candy.images.thumbnail}" class="card d-none d-sm-inline" alt="${candy.name}"></td>
			<td>${candy.name}</td>
			<td class="text-nowrap">
				<span class="badge bg-danger">-</span>
				<span class="badge bg-yellow">1</span>
				<span class="badge bg-success">+</span>
			</td>
			<td class="text-center text-nowrap">${candy.price} kr</td>
			<td class="text-center text-nowrap">${candy.price} kr</td>
		</tr>
	`
}