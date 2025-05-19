<script>
    import { error } from "@sveltejs/kit";
    import { page } from "$app/stores";

    let Component = null;

    // Load tất cả components trong thư mục hiện tại
    const modules = import.meta.glob("./*.svelte");

    // Reactively load component khi param.id thay đổi
    $: loadComponent();

    function getComponentName() {
        const id = $page.params.id;
        if (id.includes('game')) {
            const path = `./${id}.svelte`;
            // Kiểm tra file tồn tại trong glob
            if (modules[path]) return path;
        }
        // fallback mặc định
        return './game_all.svelte';
    }

    async function loadComponent() {
        const id = $page.params.id;
        const path = getComponentName();

        if (modules[path]) {
            const mod = await modules[path]();
            Component = mod.default;
        } else {
            // Có thể show lỗi tùy ý hoặc dùng throw error
            throw error(404, `Component "${id}" not found`);
        }
    }
</script>

{#if Component}
    <svelte:component this={Component} />
{:else}
    <p>Loading...</p>
{/if}
