export interface ICandy {
    id: number,
    name: string,
    description: string,
    price: number,
    on_sale: boolean,
    images: {
        thumbnail: string,
        large: string, 
    },
    stock_status: string,
    stock_quantity: number | null,
    }


export let candyArr: ICandy[] = []

export const fetchCandy = async () => {
    const response = await fetch('http://bortakvall.se/api/products')
   if(!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
   }
   
   return await response.json() as ICandy[]
   
   
}


export const getCandy = async () => {
    candyArr = await fetchCandy()

   console.log(candyArr);
    
}

getCandy()










