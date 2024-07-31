
// MARKDOWN RENDERING
// Function to fetch the file content and render it with Marked.js
async function loadMarkdown(markdownFilePath) {
    try {
      const response = await fetch(markdownFilePath);
      const markdownContent = await response.text();
      document.getElementById('content').innerHTML = marked.parse(markdownContent);
    } catch (error) {
      console.error('Error loading Markdown file:', error);
    }
  }
  
  // Function to load the Markdown file corresponding to the current hash
  function loadMarkdownForHash() {
    const hash = location.hash.slice(1);
    if (hash.startsWith('file-')) {
      const markdownFilePath = `/${hash.slice(5)}.md`;
      loadMarkdown(markdownFilePath);
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    } else if (hash === '') {
      loadMarkdown('./homepage.md');
    }
  }
  
  // Load the Markdown content when the page is ready
  loadMarkdownForHash();
  
  // Update the Markdown content when the hash changes
  window.addEventListener('hashchange', loadMarkdownForHash);
  
  // Show or hide "Back to Top" button based on scroll position
  window.onscroll = function() {
    const button = document.getElementById('back-to-top');
    if (document.documentElement.scrollTop > 100) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  };

// CONTROL ACCESS SHOW PAGE SECTIONS, GET USERID HEADER
document.addEventListener('DOMContentLoaded', function() {
    fetch("https://cleanmybuilding.co/tenants/", {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(response => {
        console.log(response.headers);  // Log all headers to the console for inspection
        response.headers.forEach((value, name) => {
            console.log(`${name}: ${value}`);  // Log each header and its value
        });
        const userEmail = response.headers.get('X-User-ID');  // Fetch the correct header
        console.log('User Email:', userEmail); // Log the user email to ensure it's being fetched correctly
        if (userEmail) {
            localStorage.setItem('userEmail', userEmail);  // Store the userEmail
            controlAccess(userEmail);
        }
    })
    .catch(error => console.error('Error:', error));
});

// SHOW PAGE SECTIONS BASED ON USERID
