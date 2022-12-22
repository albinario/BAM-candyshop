import { Candy } from './types'
import { inCartEl  } from './elements'


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
	inCartEl.innerText = String(candysInCart.length)
}