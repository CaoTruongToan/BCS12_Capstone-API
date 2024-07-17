var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './assets/animation/Animation - 1721198875708.json'
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;

    const data = {
        email: email,
        password: password,
        name: name,
        gender: gender === 'true',
        phone: phone
    };

    fetch('https://shop.cyberlearn.vn/api/Users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            showToast('Registration successful!', 3000, 'success-toast');
            setTimeout(function() {
                window.location.href = '/index.html'; 
            }, 3000);
        } else {
            showToast('Registration failed: ' + data.message, 3000, 'error-toast');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred. Please try again later.', 3000, 'error-toast');
    });
});

function showToast(text, duration, className) {
    Toastify({
        text: text,
        duration: duration,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: className === 'success-toast' ? 'green' : 'red',
        },
        onClick: function(){} // Callback after click
    }).showToast();
}
