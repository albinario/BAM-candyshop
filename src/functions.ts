import { Candy } from './types'
import { inCartEls, tableContentEl  } from './elements'
import { apiUrl } from './api'




export const shuffleArray = (array: Candy[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

export const updateCart = (candysInCart: Candy[], candy: Candy) => {
	candysInCart.push(candy)
	localStorage.setItem('in-cart', JSON.stringify(candysInCart))
	inCartEls.forEach(el => el.innerHTML = String(candysInCart.length))
	renderCandyInCart(candy)
}

export const renderCandyInCart = (candy: Candy) => {
	tableContentEl.innerHTML += 
	`
		<tr>
		<td><img src="${apiUrl}/${candy.images.thumbnail}" class="" alt="${candy.name}"></td>
		<td>${candy.name}</td>
		<td>
			<span class="badge bg-danger">-</span>
			<span class="badge bg-warning">0</span>
			<span class="badge bg-success">+</span>
		</td>
		<td>${candy.price} sek</td>
		<td>${candy.price} sek</td>
		</tr>	
	`	
}

