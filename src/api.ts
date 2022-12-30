import { orderMsgEl, } from "./elements"
import { IOrder } from "./types"

export const apiUrl = 'https://www.bortakvall.se'

export const getCandys = async () => {
	const res = await fetch(`${apiUrl}/api/products`)

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`)
	}

	return await res.json()
}

export const createOrder = async (newOrder: IOrder) => {
	const res = await fetch('https://www.bortakvall.se/api/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newOrder),
	})
  

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`)
	}else {
        const response = await res.json()

        orderMsgEl.innerHTML = `
        <i class="fa-solid fa-handshake"></i>
        <p>${response.data.id}
        
       `
    }
}
