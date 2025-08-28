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
