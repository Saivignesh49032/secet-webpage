function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    // Mock credentials for demo
    if (username === 'admin' && password === 'seacet2025') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        loadAnalytics();
    } else {
        alert('Invalid credentials');
    }
}

function loadAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('chatbotAnalytics')) || { queries: {} };
    const ctx = document.getElementById('query-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(analytics.queries),
            datasets: [{
                label: 'Query Frequency',
                data: Object.values(analytics.queries),
                backgroundColor: '#f28c38'
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

document.getElementById('response-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pattern = document.getElementById('query-pattern').value;
    const response = document.getElementById('response-text').value;
    let chatbotData = JSON.parse(localStorage.getItem('chatbotData')) || {};
    chatbotData[pattern.toLowerCase()] = response;
    localStorage.setItem('chatbotData', JSON.stringify(chatbotData));
    alert('Response added successfully');
    e.target.reset();
});