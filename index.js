const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const login_id = document.getElementById('login_id').value;
    const password = document.getElementById('password').value;

    const authenticationData = {
        login_id: login_id,
        password: password
    };

    try {
        const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
            method: 'POST',
            body: JSON.stringify(authenticationData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            const token = data.token;

            // Store the token for subsequent API calls
            localStorage.setItem('token', token);

            // Redirect to the customer list page or perform other actions as needed
            window.location.href = 'customer_list.html';
        } else if (response.status === 401) {
            alert('Invalid Authorization');
        } else {
            alert('Authentication failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
