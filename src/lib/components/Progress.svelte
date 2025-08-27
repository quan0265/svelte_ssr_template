<script>
    import { beforeNavigate, afterNavigate } from "$app/navigation";

    let visible = false;
    let pct = 0;
    let timer;

    function start() {
        clearInterval(timer);
        visible = true;
        pct = 4;
        timer = setInterval(() => {
            const step = Math.max(1, (100 - pct) * 0.03) + Math.random() * 4;
            pct = Math.min(90, pct + step);
        }, 150);
    }

    function finish() {
        clearInterval(timer);
        pct = 100;
        setTimeout(() => {
            visible = false;
            pct = 0;
        }, 300);
    }

    // đăng ký ngay khi component khởi tạo (nhưng chỉ chạy ở client)
    const unsubBefore = beforeNavigate(() => start());
    const unsubAfter = afterNavigate(() => finish());

    // cleanup khi component bị destroy
    export function onDestroy() {
        unsubBefore();
        unsubAfter();
        clearInterval(timer);
    }
</script>

{#if visible}
    <div class="progress-root visible" aria-hidden="true">
        <div class="bar" style="width: {pct}%"></div>
    </div>
{:else}
    <!-- vẫn render vùng để tránh flicker khi SSR->CSR; nhưng ẩn bằng class -->
    <div class="progress-root hidden" aria-hidden="true">
        <div class="bar" style="width: 0%"></div>
    </div>
{/if}

<style>
    /* container fixed top, pointer-events none để không can thiệp click */
    .progress-root {
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        width: 100%;
        z-index: 9999;
        pointer-events: none;
    }

    .bar {
        height: 100%;
        width: 0%;
        transition:
            width 250ms linear,
            opacity 300ms linear;
        transform-origin: left center;
        /* bạn có thể đổi màu hoặc dùng gradient */
        background: linear-gradient(90deg, #008f99, #008f99);
        box-shadow: 0 0 8px rgba(0 143 153, 0.6);
    }

    /* ẩn khi không visible (opacity để transition mượt) */
    .hidden {
        opacity: 0;
        pointer-events: none;
    }

    .visible {
        opacity: 1;
    }
</style>
