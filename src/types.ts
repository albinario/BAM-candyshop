export type Candy = {
	id: number
	name: string
	description: string
	price: number
	on_sale: boolean
	images: {
		thumbnail: string
		large: string
	}
	stock_status: string
	stock_quantity: number
}

export type CandyInCart = {
	candy: Candy
	in_cart: number
	in_stock: number
	show: boolean
}