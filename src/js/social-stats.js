/**
 * Client-side Social Media Live Stats Fetcher
 * Safely fetches live follower/subscriber stats from /api/social-stats
 * and updates top-right brand badges on the website.
 */

document.addEventListener('DOMContentLoaded', () => {
    initLiveStatsFetcher();
});

async function initLiveStatsFetcher() {
    try {
        const res = await fetch('/api/social-stats');
        if (!res.ok) return;

        const result = await res.json();
        if (result && result.success && result.data) {
            updateBrandPlatformBadges(result.data);
        }
    } catch (err) {
        // Silently fallback to static baseline numbers present in HTML
        console.debug('Live stats endpoint unavailable, using static fallback numbers.');
    }
}

/**
 * Updates top-right platform badge elements with live data across all brand slides
 */
function updateBrandPlatformBadges(stats) {
    if (!stats) return;

    // Slide 1 (KANANNURUYEVS)
    if (stats.kanannuruyevs) {
        const igFol = document.getElementById('knr-top-ig-fol');
        const ytFol = document.getElementById('knr-top-yt-fol');
        const ttFol = document.getElementById('knr-top-tt-fol');

        if (igFol && stats.kanannuruyevs.instagram) igFol.textContent = stats.kanannuruyevs.instagram;
        if (ytFol && stats.kanannuruyevs.youtube && stats.kanannuruyevs.youtube !== '–') {
            ytFol.textContent = stats.kanannuruyevs.youtube;
            ytFol.style.display = 'inline-block';
        }
        if (ttFol && stats.kanannuruyevs.tiktok && stats.kanannuruyevs.tiktok !== '–') {
            ttFol.textContent = stats.kanannuruyevs.tiktok;
            ttFol.style.display = 'inline-block';
        }
    }

    // Slide 2 (KANANWHISPERSASMR)
    if (stats.kananwhispersasmr) {
        const ytFol = document.getElementById('kwa-top-yt-fol');
        const igFol = document.getElementById('kwa-top-ig-fol');
        const ttFol = document.getElementById('kwa-top-tt-fol');

        if (ytFol && stats.kananwhispersasmr.youtube) ytFol.textContent = stats.kananwhispersasmr.youtube;
        if (igFol && stats.kananwhispersasmr.instagram) igFol.textContent = stats.kananwhispersasmr.instagram;
        if (ttFol && stats.kananwhispersasmr.tiktok && stats.kananwhispersasmr.tiktok !== '–') {
            ttFol.textContent = stats.kananwhispersasmr.tiktok;
            ttFol.style.display = 'inline-block';
        }
    }

    // Slide 3 (KANANSNOTE) language sub-channels
    if (stats.kanansnote && stats.kanansnote.en) {
        const enStats = stats.kanansnote.en;
        const igFol = document.getElementById('kn-top-ig-fol');
        const ytFol = document.getElementById('kn-top-yt-fol');
        const ttFol = document.getElementById('kn-top-tt-fol');
        
        if (igFol && enStats.instagram) igFol.textContent = enStats.instagram;
        if (ytFol && enStats.youtube) ytFol.textContent = enStats.youtube;
        if (ttFol && enStats.tiktok && enStats.tiktok !== '–') {
            ttFol.textContent = enStats.tiktok;
            ttFol.style.display = 'inline-block';
        }
    }
}
