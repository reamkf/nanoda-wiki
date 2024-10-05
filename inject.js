document.addEventListener('DOMContentLoaded', (event) => {
	main();
});

/**
 * 指定されたソースからスクリプトを読み込み、integrityを自動計算して属性を設定します。
 * 失敗した場合はintegrity無しで再試行します。
 * @param {string} src - スクリプトのソースURL。
 * @param {Object} attributes - スクリプト要素に追加する任意の属性。
 * @returns {Promise<void>} スクリプトの読み込みの完了を示すPromise。
 */
async function loadScript(src, attributes = {}) {
    // SRIハッシュを計算する関数 (SHA-512を使用)
    async function calculateSRI(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const buffer = await response.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest('SHA-512', buffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return `sha512-${btoa(hashHex)}`;
        } catch (error) {
            console.error('Error calculating SRI:', error);
            throw error;
        }
    }

    // スクリプトを読み込む関数
    function loadScriptElement(scriptSrc, scriptIntegrity = null) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptSrc;

            if (scriptIntegrity) {
                script.integrity = scriptIntegrity;
            }

            // デフォルトでcrossorigin属性を設定
            script.crossOrigin = 'anonymous';

            // Set custom attributes
            for (const [key, value] of Object.entries(attributes)) {
                script.setAttribute(key, value);
            }

            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    try {
        // まず、integrityを計算してスクリプトを読み込む
        const integrity = await calculateSRI(src);
        console.log(`Calculated integrity: ${integrity}`);
        await loadScriptElement(src, integrity);
        console.log('Script loaded successfully with integrity');
    } catch (error) {
        console.warn('Failed to load script with integrity. Retrying without integrity...', error);
        try {
            // integrity無しで再試行
            await loadScriptElement(src);
            console.log('Script loaded successfully without integrity');
        } catch (retryError) {
            console.error('Failed to load script even without integrity:', retryError);
            throw retryError;
        }
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