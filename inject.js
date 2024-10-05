document.addEventListener('DOMContentLoaded', (event) => {
	main();
});

/**
 * 指定されたソースからスクリプトを読み込み、integrityを自動計算して属性を設定します。
 * @param {string} src - スクリプトのソースURL。
 * @param {Object} attributes - スクリプト要素に追加する任意の属性。
 * @returns {Promise<void>} スクリプトの読み込みの完了を示すPromise。
 */
async function loadScript(src, attributes = {}) {
    // SRIハッシュを計算する関数
    async function calculateSRI(url) {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-384', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return `sha384-${btoa(hashHex)}`;
    }

    try {
        const integrity = await calculateSRI(src);

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.integrity = integrity;

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
    } catch (error) {
        console.error('Error calculating SRI or loading script:', error);
        throw error;
    }
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