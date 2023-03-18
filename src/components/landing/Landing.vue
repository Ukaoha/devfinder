<template>
	<div>
		<MainComponent />
	</div>
</template>

<script>
import MainComponent from "./components/main/Main.vue";

export default {
	components: {
		MainComponent,
	},
};
</script>

<style scoped>
div {
	position: relative;
	min-height: 100vh;
}
</style>
