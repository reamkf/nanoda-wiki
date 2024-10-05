document.addEventListener('DOMContentLoaded', (event) => {
	main();
});

/**
 * 指定されたソースからスクリプトを読み込み、成功時と失敗時にそれぞれ解決または拒否されるPromiseを返します。
 * @param {string} src - スクリプトのソースURL。
 * @param {Object} attributes - スクリプト要素に追加する任意の属性。
 * @returns {Promise<void>} スクリプトの読み込みの完了を示すPromise。
 */
function loadScript(src, attributes = {}) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;

		// デフォルトでcrossorigin属性を設定
        if (!attributes.hasOwnProperty('crossorigin')) {
            script.crossOrigin = 'anonymous';
        }

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