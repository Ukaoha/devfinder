<template>
	<div class="not-found">
		<div class="not-found-card">
			<div class="logo-container"></div>

			<p class="not-found-title">404 Error</p>

			<p class="not-found-desc">
				The page your requested for cannot be found. Use the link below to go back
				to homepage <br />
				<router-link to="/">Homepage</router-link>
			</p>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-found *:not(i) {
	font-family: "Raleway", sans-serif;
}

.not-found {
	background-color: var(--light-dark-gray);
	height: 100vh;
	width: 100%;
	color: #fff;
	position: relative;
}

.not-found .not-found-card {
	width: 420px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 40px 20px;
	border-radius: 8px;
	background-color: #fff;
	box-shadow: 0px 4px 2px #fff;
	color: black;
	display: flex;
	flex-direction: column;
	gap: 30px;
}

.not-found .not-found-title {
	text-align: center;
	font-size: 20px;
	color: var(--primary-color);
}

.not-found .not-found-desc {
	text-align: center;
	font-size: 17px;
}

.not-found a {
	color: var(--light-dark-gray);
	text-decoration: underline;
}

.not-found .logo-container {
	display: flex;
	justify-content: center;
}

@media screen and (max-width: 760px) {
	.not-found .not-found-card {
		width: 90%;
	}
}
</style>
