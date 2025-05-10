S.E.A College of Engineering and Technology Website

A responsive website for SEACET with an AI chatbot, student portal, and next-word prediction.

Setup Instructions





Clone the Repository:

git clone <repository-url>
cd sea-college-website



Install Visual Studio Code:





Download and install from code.visualstudio.com.



Install Live Server Extension:





In VS Code, go to Extensions (Ctrl+Shift+X) and install "Live Server" by Ritwick Dey.



Run the Website:





Open index.html in VS Code.



Right-click and select "Open with Live Server" to launch the website in your browser.

Features





Home Page: College overview and programs.



Admissions Page: Admission process details.



Placements Page: Placement statistics.



Student Portal: Login with USN (e.g., 1SP22AI048) to view marks and attendance.



AI Chatbot: Handles queries, registers complaints, and suggests next words.

Folder Structure





index.html, admissions.html, placements.html, student-portal.html: Page templates.



css/styles.css: Styling.



js/main.js: General scripts.



js/chatbot.js: Chatbot logic.



js/student-portal.js: Student portal logic.



js/next-word-predictor.js: Next-word prediction.



data/student-data.js: Mock student data.

Notes





The chatbot uses a rule-based system with a simple Markov chain for next-word prediction.



Student data is mocked for demonstration (USN: 1SP22AI048).



Tested in Chrome, Firefox, and Edge.