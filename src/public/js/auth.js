;(async () => {
	let token = window.localStorage.getItem('token')
	if(token) {
		try {
			await request('/ath')
			if(!(window.location.pathname == '/')) {
				window.location = '/'
			}
		} catch(error) {
			window.localStorage.removeItem('token')
			window.localStorage.removeItem('userId')
			window.location = '/login'
		}
	} else {
		if((window.location.pathname == '/')) {
			window.location = '/login'
		}
	}
})()