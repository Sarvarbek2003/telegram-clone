let form = document.querySelector('.form')

form.onsubmit = async event => {
	try {
		event.preventDefault()

		let formData = new FormData()
		
		formData.append('images', inputFile.files[0])
		formData.append('username', usernameInput.value)
		formData.append('password', passwordInput.value)
	
		const response = await request('/auth/register', 'POST', formData)		
		window.localStorage.setItem('token', response.token)
		window.localStorage.setItem('userId', response.userId)
		window.location = '/'
		
	} catch(error) {
		errorMessage.textContent = error.message
	}
}