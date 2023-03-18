<template>
	<nav>
		<div class="Navbar">
			<span class="nav-logo">DevFinder</span>
		</div>
	</nav>
</template>

<script>
export default {
	name: "Navbar",
};
</script>

<style scoped>
.Navbar {
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #5265c4;
}

.Navbar > .nav-logo {
	font-weight: 700;
	font-size: 21px;
	margin: 15px;
	color: #ffffff;
}
</style>
