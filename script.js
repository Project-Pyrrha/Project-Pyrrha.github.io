// Script removed for static cheat menu page.
console.log("Pyrrha 1.2 Loaded");

const versionUrl = 'https://raw.githubusercontent.com/Project-Pyrrha/Pyrrha/refs/heads/main/info/version.json';

async function fetchVersionInfo() {
    try {
        const response = await fetch(versionUrl);
        if (!response.ok) throw new Error('Failed to fetch version info');
        
        const data = await response.json();
        
        // Update DOM elements
        const versionHeader = document.getElementById('version-header');
        const versionFooter = document.getElementById('version-footer');
        const dateFooter = document.getElementById('date-footer');
        const codenameDisplay = document.getElementById('codename-display');

        // Update Page Title
        document.title = `Pyrrha ${data.version}`;

        if (versionHeader) versionHeader.textContent = data.version;
        if (versionFooter) versionFooter.textContent = data.version;
        if (dateFooter) dateFooter.textContent = data.date;
        
        if (codenameDisplay && data.codename) {
            codenameDisplay.textContent = data.codename;
            codenameDisplay.classList.remove('hidden');
        }

        console.log(`Loaded Pyrrha ${data.version} (${data.codename})`);

    } catch (error) {
        console.error('Error loading version info:', error);
    }
}

fetchVersionInfo();

async function fetchGitHubActivity() {
    const repo = 'Project-Pyrrha/Pyrrha';
    const container = document.getElementById('github-activity');
    
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=5`);
        if (!response.ok) throw new Error('Failed to fetch commits');
        
        const commits = await response.json();
        
        if (container) {
            container.innerHTML = ''; // Clear loading state
            
            commits.forEach(item => {
                const msg = item.commit.message.split('\n')[0]; // First line only
                const date = new Date(item.commit.author.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                const author = item.commit.author.name;
                const url = item.html_url;
                const sha = item.sha.substring(0, 7);

                const el = document.createElement('div');
                el.className = 'border-l-2 border-border pl-4 py-1 hover:border-red transition-colors group';
                el.innerHTML = `
                    <div class="flex justify-between items-baseline mb-1">
                        <a href="${url}" target="_blank" class="text-terminal hover:text-white transition-colors font-bold truncate pr-4 block">${msg}</a>
                        <span class="text-xs text-dim whitespace-nowrap">${date}</span>
                    </div>
                    <div class="text-xs text-dim flex gap-2">
                        <span>${author}</span>
                        <span class="text-red opacity-50 group-hover:opacity-100 transition-opacity">#${sha}</span>
                    </div>
                `;
                container.appendChild(el);
            });
        }
    } catch (error) {
        console.error('Error loading GitHub activity:', error);
        if (container) container.innerHTML = '<div class="text-red">Failed to load activity feed.</div>';
    }
}

fetchGitHubActivity();

// Fire Effect Generator
// Removed event listener wrapper to ensure immediate execution
const fireContainer = document.querySelector('.fire');
if (fireContainer) {
    const burnCount = 40;
    const fireSize = 500;
    const burnSize = 100;

    // Generate particles
    for (let i = 1; i <= burnCount * 2; i++) {
        const burn = document.createElement('div');
        burn.className = 'burn';
        
        // Logic derived from SCSS loop
        // .heat particles are smaller
        const height = i <= burnCount ? (Math.random() * 10) : (Math.random() * (burnSize / 2));
        
        // Random horizontal position relative to center
        const marginLeft = (Math.random() * fireSize) - (fireSize / 2);
        
        // Random animation duration between 1s and 3s
        const duration = (Math.random() * 2000) + 1000;

        burn.style.height = `${height}px`;
        burn.style.marginLeft = `${marginLeft}px`;
        // -300ms delay ensures animation is already running (no warm-up)
        burn.style.animation = `burning ${duration}ms -300ms infinite linear`;
        
        if (i <= burnCount) burn.classList.add('heat');
        
        fireContainer.appendChild(burn);
    }
}
