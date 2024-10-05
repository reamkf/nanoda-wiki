document.addEventListener('DOMContentLoaded', (event) => {
	main();
});

/**
 * 指定されたソースからスクリプトを読み込み、複数の戦略を使用してintegrityを処理します。
 * @param {string} src - スクリプトのソースURL。
 * @param {Object} options - 追加のオプション。
 * @returns {Promise<void>} スクリプトの読み込みの完了を示すPromise。
 */
async function loadScript(src, options = {}) {
    const {
        bypassCache = true,
        allowNoIntegrity = false,
        retryTimeout = 1000,
        maxRetries = 3
    } = options;

    // キャッシュをバイパスするためのURLパラメータを追加
    function addCacheBuster(url) {
        const cacheBuster = `_=${Date.now()}`;
        return url.includes('?') ? `${url}&${cacheBuster}` : `${url}?${cacheBuster}`;
    }

    // SRIハッシュを計算する関数 (SHA-512を使用)
    async function calculateSRI(url) {
        try {
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
            if (scriptIntegrity) script.integrity = scriptIntegrity;
            script.crossOrigin = 'anonymous';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // リトライロジック
    async function retryLoad(loadFn, retries = 0) {
        try {
            return await loadFn();
        } catch (error) {
            if (retries >= maxRetries) throw error;
            await new Promise(resolve => setTimeout(resolve, retryTimeout));
            return retryLoad(loadFn, retries + 1);
        }
    }

    const finalSrc = bypassCache ? addCacheBuster(src) : src;

    try {
        // まず、integrityを計算してスクリプトを読み込む
        const integrity = await calculateSRI(finalSrc);
        console.log(`Calculated integrity: ${integrity}`);
        await retryLoad(() => loadScriptElement(finalSrc, integrity));
        console.log('Script loaded successfully with integrity');
    } catch (error) {
        console.warn('Failed to load script with calculated integrity:', error);

        if (allowNoIntegrity) {
            console.warn('Attempting to load script without integrity check...');
            try {
                await retryLoad(() => loadScriptElement(finalSrc));
                console.log('Script loaded successfully without integrity');
            } catch (retryError) {
                console.error('Failed to load script even without integrity:', retryError);
                throw retryError;
            }
        } else {
            console.error('Script loading failed and loading without integrity is not allowed.');
            throw error;
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
        await loadScript('https://cdn.jsdelivr.net/gh/reamkf/nanoda-wiki@main/table.js', {
			bypassCache: true,
			allowNoIntegrity: true,
			retryTimeout: 2000,
			maxRetries: 2
		})
    } catch (error) {
        console.error("Error in main function:", error);
    }
}