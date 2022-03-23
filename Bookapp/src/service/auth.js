const authentication = {
    isLoggedIn: false,
    async Login() {
        let response = await fetch('http://localhost:3001/auth/v1/isAuthenticated', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.isLoggedIn = data.isAuthenticated;
            //console.log("is this user authenticated? :- ", data.isAuthenticated);
            return data;
        })

        return response;
    }
}
export default authentication;