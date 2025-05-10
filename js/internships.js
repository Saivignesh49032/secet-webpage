document.addEventListener('DOMContentLoaded', () => {
    const domainFilter = document.getElementById('domain-filter');
    const tableBody = document.getElementById('internship-table').querySelector('tbody');

    // Load internship data
    fetch('data/internships.json')
        .then(response => response.json())
        .then(data => {
            renderInternships(data);

            domainFilter.addEventListener('change', () => {
                const domain = domainFilter.value;
                const filteredData = domain === 'all' ? data : data.filter(internship => internship.domain === domain);
                renderInternships(filteredData);
            });
        });

    function renderInternships(internships) {
        tableBody.innerHTML = '';
        internships.forEach(internship => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${internship.company}</td>
                <td>${internship.role}</td>
                <td>${internship.domain}</td>
                <td>${internship.eligibility}</td>
                <td><a href="${internship.applyLink}" class="cta-button">Apply</a></td>
            `;
            tableBody.appendChild(row);
        });
    }
});