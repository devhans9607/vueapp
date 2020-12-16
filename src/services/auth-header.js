export default function authHeader () {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
        return {
            "X-Auth-Token": user.token,
            "content-type": "application/json"
            // "Cookie": "token="+user.token}
        }
    } else {
        return {}
    }
}
