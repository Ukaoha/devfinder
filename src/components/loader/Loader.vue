<template>
	<div class="loader">
		<div>
			<i class="fa fa-spinner fa-spin fa-2x" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script></script>

<style scoped>
.loader {
	height: 100%;
	width: 100%;
	z-index: 10 !important;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	font-size: 20px;
	background-color: #fff;
}

.loader div {
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	color: var(--light-dark-gray);
}
</style>
