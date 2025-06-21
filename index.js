    const postsContainer = document.getElementById('posts-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');
    const searchInput = document.getElementById('searchInput');
    const darkToggle = document.getElementById('darkToggle');

    // Load theme on startup
        window.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            darkToggle.checked = true;
        }
        });
        
        // Toggle theme on click
        darkToggle.addEventListener('change', () => {
        if (darkToggle.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        });
        




    let posts = [];
    let filteredPosts = [];
    let currentPage = 1;
    const postsPerPage = 5;

    async function fetchPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        posts = await res.json();
        filteredPosts = posts;
        renderPosts();
    } catch (err) {
        postsContainer.innerHTML = '<p>Error fetching posts.</p>';
        console.error(err);
    }
    }

    function renderPosts() {
    postsContainer.innerHTML = '';

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const current = filteredPosts.slice(start, end);

    if (current.length === 0) {
        postsContainer.innerHTML = '<p>No matching posts found.</p>';
        pageInfo.textContent = 'Page 0';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    current.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post';
        postEl.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
        postsContainer.appendChild(postEl);
    });

    pageInfo.textContent = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= filteredPosts.length;
    }

    // 🔍 Search filter logic
    searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    filteredPosts = posts.filter(post => post.title.toLowerCase().includes(keyword));
    currentPage = 1; 
    renderPosts();
    });

    // Pagination handlers
    prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPosts();
    }
    });

    nextBtn.addEventListener('click', () => {
    if (currentPage * postsPerPage < filteredPosts.length) {
        currentPage++;
        renderPosts();
    }
    });

    fetchPosts();
