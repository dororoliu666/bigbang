function generateLogo(text) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><rect width='100%' height='100%' fill='#e6e6e6'/><text x='50%' y='50%' font-size='20' text-anchor='middle' fill='#333' dy='.35em'>${text}</text></svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const tools = [
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        company: 'OpenAI',
        version: '4',
        category: 'Chatbot',
        logo: generateLogo('CG'),
        description: "OpenAI's conversational AI.",
        link: 'https://openai.com'
    },
    {
        id: 'dalle-3',
        name: 'DALL·E 3',
        company: 'OpenAI',
        version: '3',
        category: 'Image Generation',
        logo: generateLogo('DE'),
        description: 'Image generation from text prompts.',
        link: 'https://openai.com/dall-e-3'
    },
    {
        id: 'stable-diffusion',
        name: 'Stable Diffusion',
        company: 'Stability AI',
        version: '1.5',
        category: 'Image Generation',
        logo: generateLogo('SD'),
        description: 'Text to image generation model.',
        link: 'https://stability.ai'
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        company: 'Midjourney',
        version: '5',
        category: 'Image Generation',
        logo: generateLogo('MJ'),
        description: 'AI-based art generation service.',
        link: 'https://www.midjourney.com'
    },
    {
        id: 'bard',
        name: 'Bard',
        company: 'Google',
        version: '2',
        category: 'Chatbot',
        logo: generateLogo('BA'),
        description: "Google's generative AI service.",
        link: 'https://bard.google.com'
    },
    {
        id: 'copilot',
        name: 'GitHub Copilot',
        company: 'GitHub',
        version: '1.0',
        category: 'Coding Assistant',
        logo: generateLogo('GP'),
        description: 'Code completion assistant for developers.',
        link: 'https://github.com/features/copilot'
    },
    {
        id: 'firefly',
        name: 'Adobe Firefly',
        company: 'Adobe',
        version: 'beta',
        category: 'Image Generation',
        logo: generateLogo('FF'),
        description: 'Creative generative AI tools by Adobe.',
        link: 'https://www.adobe.com/sensei/generative-ai'
    },
    {
        id: 'whisper',
        name: 'Whisper',
        company: 'OpenAI',
        version: '1.0',
        category: 'Speech Recognition',
        logo: generateLogo('WH'),
        description: 'Automatic speech recognition system.',
        link: 'https://openai.com'
    },
    {
        id: 'claude',
        name: 'Claude',
        company: 'Anthropic',
        version: '2',
        category: 'Chatbot',
        logo: generateLogo('CL'),
        description: 'Anthropic\'s helpful AI assistant.',
        link: 'https://www.anthropic.com'
    },
    {
        id: 'perplexity',
        name: 'Perplexity AI',
        company: 'Perplexity',
        version: '1.0',
        category: 'Search',
        logo: generateLogo('PX'),
        description: 'AI powered search and Q&A.',
        link: 'https://www.perplexity.ai'
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

            const company = document.createElement('p');
            company.className = 'meta';
            company.textContent = `Company: ${tool.company}`;
            info.appendChild(company);

            const version = document.createElement('p');
            version.className = 'meta';
            version.textContent = `Version: ${tool.version}`;
            info.appendChild(version);

            const desc = document.createElement('p');
            desc.textContent = tool.description;
            info.appendChild(desc);

            const link = document.createElement('a');
            link.href = tool.link;
            link.textContent = 'Visit';
            link.target = '_blank';
            info.appendChild(link);

            const ratingContainer = document.createElement('div');
            ratingContainer.className = 'rating-container';

            const rating = document.createElement('input');
            rating.type = 'range';
            rating.min = 0;
            rating.max = 100;
            rating.value = tool.rating || 0;
            rating.className = 'rating-slider';
            rating.addEventListener('input', () => {
                ratingDisplay.textContent = rating.value + ' %';
            });
            rating.addEventListener('change', () => saveRating(tool, rating.value));
            ratingContainer.appendChild(rating);

            const ratingDisplay = document.createElement('span');
            ratingDisplay.className = 'rating-value';
            ratingDisplay.textContent = (tool.rating || 0) + ' %';
            ratingContainer.appendChild(ratingDisplay);

            info.appendChild(ratingContainer);

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
