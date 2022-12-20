export const apiUrl = 'https://www.bortakvall.se/'

export const getItems = async () => {
	const res = await fetch(`${apiUrl}api/products`)

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`)
	}

	return await res.json()
}