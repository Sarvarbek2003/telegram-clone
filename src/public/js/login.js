let btn = document.querySelector('.form')

btn.onsubmit = async event => {
	event.preventDefault()
	try {

		let user = {
			username: usernameInput.value,
			password: passwordInput.value,
		}
	
		const response = await request('/auth/login', 'POST', user)
		
		window.localStorage.setItem('token', response.token)
		window.localStorage.setItem('userId', response.userId)
		window.location = '/'
	} catch(error) {
		errorMessage.textContent = error.message
	}
}