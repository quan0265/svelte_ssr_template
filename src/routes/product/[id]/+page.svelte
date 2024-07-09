<script>

	export let data;

	fetch('https://fakestoreapi.com/products/' + data.id)
		.then(res => res.json())
		.then(res => {
			data.product = res;
		})

	//console.log(data);

</script>

<svelte:head>
	<title>Product - {data.product?.title || ''}</title>
	<meta name="description" content="Product this app" />
</svelte:head>

<div class="text-column">
	<h1>Product</h1>
	{#if data.product}
	<div class="product" style="text-align: center; margin-top: 50px;">
		<img width="200" height="200" src="{data.product.image}" alt="">
		<div style="margin-top: 12px;">{data.product?.title || ''}</div>
	</div>
	{/if}
</div>
