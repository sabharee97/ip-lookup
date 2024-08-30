function lookupIP() {
    const ip = document.getElementById('ipInput').value.trim();
    const ipInfoDiv = document.getElementById('ipInfo');

    if (!ip) {
        ipInfoDiv.textContent = "Please enter a valid IP address.";
        return;
    }

    // API URL (using ip-api.com)
    const apiURL = `http://ip-api.com/json/${ip}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.status === "fail") {
                ipInfoDiv.textContent = "Invalid IP address.";
                return;
            }

            const info = `
                <strong>IP:</strong> ${data.query}<br>
                <strong>City:</strong> ${data.city}<br>
                <strong>Region:</strong> ${data.regionName}<br>
                <strong>Country:</strong> ${data.country}<br>
                <strong>Location:</strong> ${data.lat}, ${data.lon}<br>
                <strong>ISP:</strong> ${data.isp}<br>
                <strong>Timezone:</strong> ${data.timezone}
            `;
            ipInfoDiv.innerHTML = info;
        })
        .catch(error => {
            ipInfoDiv.textContent = "Error retrieving IP information.";
            console.error('Error:', error);
        });
}
