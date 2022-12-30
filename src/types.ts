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
	amount: number
}

export type OrderItem = {
	"product_id": number
	"qty": number
	"item_price": number
	"item_total": number
}