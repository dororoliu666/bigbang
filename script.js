const tools = [
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        category: 'Chatbot',
        logo: 'https://via.placeholder.com/60',
        description: 'OpenAI\'s conversational AI.',
        link: 'https://openai.com'
    },
    {
        id: 'stable-diffusion',
        name: 'Stable Diffusion',
        category: 'Image Generation',
        logo: 'https://via.placeholder.com/60',
        description: 'Text to image generation model.',
        link: 'https://stability.ai'
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        category: 'Image Generation',
        logo: 'https://via.placeholder.com/60',
        description: 'AI-based art generation service.',
        link: 'https://www.midjourney.com'
    },
    {
        id: 'bard',
        name: 'Bard',
        category: 'Chatbot',
        logo: 'https://via.placeholder.com/60',
        description: 'Google\'s generative AI service.',
        link: 'https://bard.google.com'
    }
];

function loadRatings() {
    tools.forEach(tool => {
        const saved = localStorage.getItem('rating_' + tool.id);
        tool.rating = saved ? parseInt(saved, 10) : 0;
    });
}

function saveRating(tool, rating) {
    localStorage.setItem('rating_' + tool.id, rating);
    tool.rating = rating;
    renderTools();
}

function getCategories() {
    const cats = new Set();
    tools.forEach(t => cats.add(t.category));
    return Array.from(cats);
}

function renderCategoryOptions() {
    const select = document.getElementById('category-filter');
    getCategories().forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

function renderTools() {
    const container = document.getElementById('tools-container');
    container.innerHTML = '';
    const search = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;

    tools
        .filter(t => (!category || t.category === category))
        .filter(t => t.name.toLowerCase().includes(search) || t.description.toLowerCase().includes(search))
        .forEach(tool => {
            const div = document.createElement('div');
            div.className = 'tool';

            const img = document.createElement('img');
            img.src = tool.logo;
            div.appendChild(img);

            const info = document.createElement('div');
            const title = document.createElement('h3');
            title.textContent = tool.name;
            info.appendChild(title);

            const desc = document.createElement('p');
            desc.textContent = tool.description;
            info.appendChild(desc);

            const link = document.createElement('a');
            link.href = tool.link;
            link.textContent = 'Visit';
            link.target = '_blank';
            info.appendChild(link);

            const rating = document.createElement('input');
            rating.type = 'number';
            rating.min = 0;
            rating.max = 100;
            rating.value = tool.rating || 0;
            rating.className = 'rating-input';
            rating.addEventListener('change', () => saveRating(tool, rating.value));
            info.appendChild(rating);

            const ratingDisplay = document.createElement('span');
            ratingDisplay.textContent = ' %';
            info.appendChild(ratingDisplay);

            div.appendChild(info);
            container.appendChild(div);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadRatings();
    renderCategoryOptions();
    renderTools();
    document.getElementById("search").addEventListener("input", renderTools);
    document.getElementById("category-filter").addEventListener("change", renderTools);
});
