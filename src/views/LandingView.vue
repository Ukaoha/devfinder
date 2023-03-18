<template>
	<div class="home">
		<Navbar />
		<Landing />
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/navbar/Navbar.vue";
import Landing from "@/components/landing/Landing.vue";

export default {
	name: "LandingView",
	components: {
		Navbar,
		Landing,
	},
};
</script>

<style>
.home {
	position: relative;
}
</style>
