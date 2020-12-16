import axios from 'axios'

const API_URL = 'http://localhost:8080/api/v1'

class AuthService {
    login(user) {
        return axios
            .post(API_URL + '/signin', {
                userId: user.username,
                userPwd: user.password
            })
            .then(this.handleResponse)
            .then(response => {
                if (response.data.content) {
                    console.log(response)
                    localStorage.setItem('user', JSON.stringify(response.data.content))
                }

                return response.data
            })
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        })
    }

    handleResponse(response) {
        if (response.data.code !== 1000) {
            console.log("handleResponse err : " + response.data.code)
            this.logout()
            location.reload(true)

            const error = response.data && response.data.message
            return Promise.reject(error)
        }

        return Promise.resolve(response)
    }
}

export default new AuthService()
