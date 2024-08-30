function lookupIP() {
    const ip = document.getElementById('ipInput').value.trim();
    const ipInfoDiv = document.getElementById('ipInfo');

    if (!ip) {
        ipInfoDiv.textContent = "Please enter a valid IP address.";
        return;
    }

    // Using ipinfo.io API
    const apiURL = `https://ipinfo.io/${ip}/json`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                ipInfoDiv.textContent = "Invalid IP address.";
                return;
            }

            const info = `
                <strong>IP:</strong> ${data.ip}<br>
                <strong>City:</strong> ${data.city}<br>
                <strong>Region:</strong> ${data.region}<br>
                <strong>Country:</strong> ${data.country}<br>
                <strong>Location:</strong> ${data.loc}<br>
                <strong>ISP:</strong> ${data.org}<br>
                <strong>Timezone:</strong> ${data.timezone}
            `;
            ipInfoDiv.innerHTML = info;
        })
        .catch(error => {
            ipInfoDiv.textContent = "Error retrieving IP information.";
            console.error('Error:', error);
        });
}
