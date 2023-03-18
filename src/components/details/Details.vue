<template>
	<div>
		<MainComponent :repoId="repoId" />
	</div>
</template>

<script>
import MainComponent from "./components/main/Main.vue";

export default {
	components: {
		MainComponent,
	},
	props: ["repoId"],
};
</script>

<style scoped>
div {
	position: relative;
	padding-top: 130px;
	min-height: 100vh;
}
</style>
