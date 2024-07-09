<script>

	export let data;

	console.log(data);

</script>

<svelte:head>
	<title>Products</title>
	<meta name="description" content="Products this app" />
</svelte:head>

<div class="text-column">
	<h1>Products</h1>
	<div class="product-list">
		{#each data.products as product}
		<div class="product-item">
			<img src="{product.image}" alt="">
			<span>{product.title}</span>
		</div>
		{/each}
	</div>
</div>
