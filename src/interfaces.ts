interface OrderItem {
	product_id: number
	qty: number
	item_price: number
	item_total: number
}

export interface IOrder {
	customer_first_name: string
	customer_last_name: string 
	customer_address: string 
	customer_postcode: string 
	customer_city: string 
	customer_email: string 
	order_total: number 
	order_items: OrderItem[]
}

export interface OrderedItem {
	id: number
	item_price: number
	item_total: number
	order_id: number
	product_id: number
	qty: number
}