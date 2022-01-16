const backendApi = 'https://telegram-back-end.herokuapp.com'

async function request (route, method, body) {
	let headers = {
		token: window.localStorage.getItem('token')
	}

	if( !(body instanceof FormData) ) {
		headers['Content-Type'] = 'application/json'
	}

	let response = await fetch(backendApi + route, {
		method,
		headers,
		body: (body instanceof FormData) ? body : JSON.stringify(body)
	})
	if(!(response.status === 200 || response.status === 201)) {
		response = await response.json()
		throw new Error(response.message)
	}

	return await response.json()
}


function createElements (...array) {
	return array.map(el => document.createElement(el))
}
