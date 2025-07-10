function generateLogo(text) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><rect width='100%' height='100%' fill='#e6e6e6'/><text x='50%' y='50%' font-size='20' text-anchor='middle' fill='#333' dy='.35em'>${text}</text></svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const defaultTools = [
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        company: 'OpenAI',
        version: '4',
        country: '🇺🇸 US',
        created: '2022',
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
        country: '🇺🇸 US',
        created: '2023',
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
        country: '🇬🇧 UK',
        created: '2022',
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
        country: '🇺🇸 US',
        created: '2022',
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
        country: '🇺🇸 US',
        created: '2023',
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
        country: '🇺🇸 US',
        created: '2021',
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
        country: '🇺🇸 US',
        created: '2023',
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
        country: '🇺🇸 US',
        created: '2022',
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
        country: '🇺🇸 US',
        created: '2023',
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
        country: '🇺🇸 US',
        created: '2022',
        logo: generateLogo('PX'),
        description: 'AI powered search and Q&A.',
        link: 'https://www.perplexity.ai'
    },
    {
        id: 'ernie-bot',
        name: '文心一言',
        company: 'Baidu',
        version: '4.0',
        category: 'Chatbot',
        country: '🇨🇳 CN',
        created: '2023',
        logo: generateLogo('EB'),
        description: '百度的生成式对话模型。',
        link: 'https://yiyan.baidu.com'
    },
    {
        id: 'qwen',
        name: '通义千问',
        company: 'Alibaba',
        version: '2.0',
        category: 'Chatbot',
        country: '🇨🇳 CN',
        created: '2023',
        logo: generateLogo('QW'),
        description: '阿里巴巴推出的大语言模型。',
        link: 'https://tongyi.aliyun.com'
    },
    {
        id: 'spark',
        name: '讯飞星火',
        company: 'iFlytek',
        version: '2.0',
        category: 'Chatbot',
        country: '🇨🇳 CN',
        created: '2023',
        logo: generateLogo('SP'),
        description: '科大讯飞研发的对话式AI。',
        link: 'https://xinghuo.xfyun.cn'
    },
    {
        id: 'sensechat',
        name: '商汤日日新',
        company: 'SenseTime',
        version: '1.0',
        category: 'Chatbot',
        country: '🇨🇳 CN',
        created: '2023',
        logo: generateLogo('SC'),
        description: '商汤科技的多模态聊天机器人。',
        link: 'https://www.sensetime.com'
    },
    {
        id: '360brain',
        name: '360 智脑',
        company: '360',
        version: '1.0',
        category: 'Chatbot',
        country: '🇨🇳 CN',
        created: '2023',
        logo: generateLogo('36'),
        description: '360 集团推出的大模型助手。',
        link: 'https://ai.360.cn'
    }
];

let tools = [];

function markVisited(tool) {
    let ids = JSON.parse(localStorage.getItem('recent_tools') || '[]');
    ids = ids.filter(id => id !== tool.id);
    ids.unshift(tool.id);
    ids = ids.slice(0, 10);
    localStorage.setItem('recent_tools', JSON.stringify(ids));
}

async function loadTools() {
    try {
        const resp = await fetch('tools.json');
        if (!resp.ok) throw new Error('failed');
        tools = await resp.json();
    } catch (e) {
        console.warn('Using built-in dataset:', e);
        tools = defaultTools;
    }
}

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

let selectedCategory = '';

function createToolCard(tool) {
    const div = document.createElement('div');
    div.className = 'tool';

    const img = document.createElement('img');
    img.src = tool.logo;
    div.appendChild(img);

    const info = document.createElement('div');
    info.className = 'tool-info';

    const title = document.createElement('h3');
    title.textContent = tool.name;
    info.appendChild(title);

    const company = document.createElement('p');
    company.className = 'meta';
    company.textContent = `Company: ${tool.company}`;
    info.appendChild(company);

    const country = document.createElement('p');
    country.className = 'meta';
    country.textContent = `Country: ${tool.country}`;
    info.appendChild(country);

    const version = document.createElement('p');
    version.className = 'meta';
    version.textContent = `Version: ${tool.version}`;
    info.appendChild(version);

    const created = document.createElement('p');
    created.className = 'meta';
    created.textContent = `Created: ${tool.created}`;
    info.appendChild(created);

    const desc = document.createElement('p');
    desc.textContent = tool.description;
    info.appendChild(desc);

    const link = document.createElement('a');
    link.href = tool.link;
    link.textContent = '去体验';
    link.className = 'visit-btn';
    link.target = '_blank';
    link.addEventListener('click', () => markVisited(tool));
    info.appendChild(link);

    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'rating-container';

    const ratingDisplay = document.createElement('span');
    ratingDisplay.className = 'rating-value';
    ratingDisplay.textContent = (tool.rating || 0) + ' %';
    ratingContainer.appendChild(ratingDisplay);

    const rateBtn = document.createElement('button');
    rateBtn.textContent = '评分';
    rateBtn.className = 'rate-btn';
    rateBtn.addEventListener('click', () => {
        const value = prompt('请输入评分(0-100)：', tool.rating || '0');
        const num = parseInt(value, 10);
        if (!isNaN(num) && num >= 0 && num <= 100) {
            saveRating(tool, num);
            ratingDisplay.textContent = num + ' %';
        }
    });
    ratingContainer.appendChild(rateBtn);

    info.appendChild(ratingContainer);

    div.appendChild(info);
    return div;
}

function renderCategoryTags() {
    const container = document.getElementById('category-tags');
    container.innerHTML = '';
    const categories = [''].concat(getCategories());
    categories.forEach(cat => {
        const tag = document.createElement('span');
        tag.className = 'category-tag';
        tag.dataset.category = cat;
        tag.textContent = '#' + (cat || 'All');
        tag.addEventListener('click', () => {
            selectedCategory = cat;
            document.querySelectorAll('.category-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            renderTools();
        });
        container.appendChild(tag);
    });
    // Set first tag (All) active by default
    const first = container.querySelector('.category-tag');
    if (first) first.classList.add('active');
}

function renderTools() {
    const container = document.getElementById('tools-container');
    container.innerHTML = '';
    const search = document.getElementById('search').value.toLowerCase();
    const category = selectedCategory;

    tools
        .filter(t => (!category || t.category === category))
        .filter(t => t.name.toLowerCase().includes(search) || t.description.toLowerCase().includes(search))
        .forEach(tool => {
            const card = createToolCard(tool);
            container.appendChild(card);
        });
}

function renderRecentTools() {
    const container = document.getElementById('recent-container');
    container.innerHTML = '';
    const ids = JSON.parse(localStorage.getItem('recent_tools') || '[]');
    const recent = ids.map(id => tools.find(t => t.id === id)).filter(Boolean);
    recent.forEach(tool => {
        const card = createToolCard(tool);
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadTools();
    loadRatings();
    renderCategoryTags();
    renderTools();
    document.getElementById("search").addEventListener("input", renderTools);

    document.querySelectorAll('.sidebar li').forEach(li => {
        li.addEventListener('click', () => {
            document.querySelectorAll('.sidebar li').forEach(n => n.classList.remove('active'));
            li.classList.add('active');
            const view = li.dataset.view;
            if (view === 'recent') {
                document.getElementById('category-tags').style.display = 'none';
                document.querySelector('.controls').style.display = 'none';
                document.getElementById('tools-container').style.display = 'none';
                document.getElementById('recent-container').style.display = '';
                renderRecentTools();
            } else {
                document.getElementById('category-tags').style.display = '';
                document.querySelector('.controls').style.display = '';
                document.getElementById('tools-container').style.display = '';
                document.getElementById('recent-container').style.display = 'none';
                renderTools();
            }
        });
    });
});
