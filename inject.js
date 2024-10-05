document.addEventListener('DOMContentLoaded', (event) => {
	main();
});

/**
 * キャッシュバスターを使用してスクリプトを読み込む関数
 * @param {string} src - スクリプトのURL
 * @param {Object} options - 追加のオプション
 * @returns {Promise<void>} スクリプトの読み込みの完了を示すPromise
 */
function loadScriptWithCacheBuster(src, options = {}) {
    const {
        retryCount = 3,
        retryDelay = 1000,
        cacheBusterParam = '_v'
    } = options;

    // キャッシュバスターを追加するヘルパー関数
    function addCacheBuster(url) {
        const cacheBuster = `${cacheBusterParam}=${Date.now()}`;
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${cacheBuster}`;
    }

    // スクリプトを読み込む関数
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.crossOrigin = 'anonymous';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // リトライロジック
    async function retry(fn, retriesLeft = retryCount) {
        try {
            return await fn();
        } catch (error) {
            if (retriesLeft === 0) throw error;
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return retry(fn, retriesLeft - 1);
        }
    }

    // キャッシュバスターを追加したURLでスクリプトを読み込む
    const srcWithCacheBuster = addCacheBuster(src);
    console.log(`Loading script: ${srcWithCacheBuster}`);

    return retry(() => loadScript(srcWithCacheBuster))
        .then(() => console.log('Script loaded successfully'))
        .catch((error) => {
            console.error('Failed to load script:', error);
            throw error;
        });
}

function addCSS(css){
	const style = document.createElement("style");
	style.innerHTML = css;
	document.head.append(style);
}


async function main() {
    try {
        await loadScriptWithCacheBuster('https://cdn.jsdelivr.net/gh/reamkf/nanoda-wiki@0.0.1/table.js', {
			retryCount: 2,
			retryDelay: 2000,
			cacheBusterParam: '_nocache'
		})
    } catch (error) {
        console.error("Error in main function:", error);
    }
}