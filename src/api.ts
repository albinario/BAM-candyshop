import { IOrder } from './interfaces'

export const apiUrl = 'https://albin-bortakvall.cyclic.app'
export const imgUrl = 'https://bortakvall.se'

export const getCandys = async () => {
	const res = await fetch(`${apiUrl}/products`)

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`)
	}

	return await res.json()
}

export const createOrder = async (newOrder: IOrder) => {
	const res = await fetch(`${apiUrl}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newOrder),
	})

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`)
	}
	return await res.json()
}
