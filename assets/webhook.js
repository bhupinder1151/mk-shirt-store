function attachNoteAttributes() {
    // Retrieve fbc and fbp from cookies
    const fbc = getCookie('_fbc');
    const fbp = getCookie('_fbp');

    // Log fbc and fbp to console to verify
    console.log('FBC:', fbc ? fbc : 'No FBC cookie found');
    console.log('FBP:', fbp ? fbp : 'No FBP cookie found');

    // Only proceed if cookies exist
    if (fbc || fbp) {
        fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
                console.log("Cart Json",cart);
                
                return fetch('/cart/update.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        attributes: {
                            _fbc: fbc,
                            _fbp: fbp
                        }
                    })
                });
            })
            .then(response => response.json())
            .then(updatedCart => {
                console.log('Checkout attributes updated:', updatedCart);
            })
            .catch(error => {
                console.error('Error updating checkout attributes:', error);
            });
    } else {
        console.log('No FBC or FBP cookie to send');
    }

}

// Function to get cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}