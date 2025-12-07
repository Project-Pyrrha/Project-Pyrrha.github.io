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
