document.addEventListener('DOMContentLoaded', (event) => {
	main();
});

function loadScript(src, attributes = {}) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;

        // Set custom attributes
        for (const [key, value] of Object.entries(attributes)) {
            script.setAttribute(key, value);
        }

        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function addCSS(css){
	const style = document.createElement("style");
	style.innerHTML = css;
	document.head.append(style);
}


async function main() {
    try {
        await loadScript('https://cdn.jsdelivr.net/gh/reamkf/nanoda-wiki@main/table.js');
    } catch (error) {
        console.error("Error in main function:", error);
    }
}