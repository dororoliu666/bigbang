const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs/promises');

const BASE = 'https://ai-bot.cn';

async function fetchCategories() {
  const { data } = await axios.get(BASE);
  const $ = cheerio.load(data);
  const cats = [];
  $('.navbar-nav a').each((i, el) => {
    const name = $(el).text().trim();
    const url = $(el).attr('href');
    if (name && url && url.startsWith('/')) {
      cats.push({ name, url: BASE + url });
    }
  });
  return cats;
}

async function fetchToolsFromCategory(cat) {
  const { data } = await axios.get(cat.url);
  const $ = cheerio.load(data);
  const tools = [];
  $('.card').each((i, el) => {
    const name = $(el).find('.card-title').text().trim();
    const link = $(el).find('a').attr('href');
    if (!name || !link) return;
    tools.push({ name, link: BASE + link, category: cat.name });
  });
  return tools;
}

async function fetchToolDetail(tool) {
  const { data } = await axios.get(tool.link);
  const $ = cheerio.load(data);
  const logo = $('.site-logo img').attr('src');
  const desc = $('.site-desc').text().trim();
  const company = $('.site-company').text().trim();
  const version = $('.site-version').text().trim();
  const country = $('.site-country').text().trim();
  const created = $('.site-date').text().trim();
  return {
    id: tool.link.split('/').pop().replace('.html',''),
    name: tool.name,
    company,
    version,
    country,
    created,
    category: tool.category,
    logo,
    description: desc,
    link: tool.link
  };
}

async function main() {
  const categories = await fetchCategories();
  let results = [];
  for (const cat of categories) {
    const tools = await fetchToolsFromCategory(cat);
    for (const t of tools) {
      const info = await fetchToolDetail(t);
      results.push(info);
    }
  }
  await fs.writeFile('tools.json', JSON.stringify(results, null, 2));
  console.log('Saved', results.length, 'tools');
}

main().catch(err => console.error(err));
