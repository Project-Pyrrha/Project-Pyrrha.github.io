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
