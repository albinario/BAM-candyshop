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
  
	console.log(res);
	
	
	if (!res.ok) {
		orderMsgEl.innerHTML += `
		<p class="alert alert-danger mt-3 text-black">Something went wrong, unfortunately</p>`
		throw new Error(`${res.status} ${res.statusText}`)
	}
		const datapost = await res.json()
    	console.log('svar', datapost);
        orderMsgEl.innerHTML = `
        <i class="fa-solid fa-handshake"></i>
		<h3>Thank you for the order!</h3>
		<p>Your order ID is <span class="id-color">${datapost.data.id}</span</p>
		<p>We have sent a order confirmation to <a href="#">${datapost.data.customer_email}</a></p>
		<p>Have a great day and enjoy your candy soon!</p>
		<p>All the best from the <img class="bam-staff-img"src="logo.svg" alt="BAM Candyshop"> staff ❤️ </p>
		<div class="img-container">
		<img src="/assets/albin_lindeborg.jpg" alt="">
		<img src="/assets/bob_oskar_kindgren.jpg" alt="">
		<img src="/assets/mans_edenfalk.jpg" alt="">
		</div>
        `
}
