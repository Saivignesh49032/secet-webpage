function login() {
    console.log('Login button clicked'); // Debug log
    const usn = document.getElementById('usn').value.trim().toUpperCase();
    console.log('USN entered:', usn); // Debug log
    const studentDetails = document.getElementById('student-details');
    const loginForm = document.getElementById('login-form');
    const student = students.find(s => s.usn === usn);
    if (student) {
        console.log('Student found:', student); // Debug log
        document.getElementById('student-name').textContent = student.name;
        document.getElementById('student-usn').textContent = student.usn;
        const marksTable = document.getElementById('marks-table');
        marksTable.innerHTML = '';
        for (const [subject, marks] of Object.entries(student.marks)) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${subject}</td><td>${marks}</td>`;
            marksTable.appendChild(row);
        }
        document.getElementById('attendance').textContent = `${student.attendance}%`;
        studentDetails.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        alert('Invalid USN. Please try again. Example USN: 1SP22AI048');
        console.log('Invalid USN:', usn); // Debug log
    }
}

// Expose login to global scope for onclick
window.login = login;

console.log('student-portal.js loaded'); // Debug log