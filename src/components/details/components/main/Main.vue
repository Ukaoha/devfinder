<template>
	<Loader v-if="loading" />
	<div v-if="data" class="wrapper">
		<h3>Details</h3>
		<div class="details">
			<p><span> Name:</span> {{ data.name }}</p>
			<p><span> Owner:</span> {{ data.owner.login }}</p>
			<p v-if="data.description">
				<span> Description:</span> {{ data.description }}
			</p>
			<p><span> Forks:</span> {{ data.forks }}</p>
			<p><span> Size:</span> {{ data.size }}kb</p>
			<p><span> Default branch:</span> {{ data.default_branch }}</p>
			<p v-if="data.language"><span>Language:</span> {{ data.language }}</p>
			<p><span> Created at:</span> {{ handleDate(data.created_at) }}</p>
			<p><span> Updated at:</span> {{ handleDate(data.updated_at) }}</p>
		</div>
		<a :href="data.html_url" target="_blank" rel="noreferrer"> View Repo </a>
	</div>
</template>

<script>
import { ref, watchEffect } from "vue";
import axios from "axios";
import swal from "sweetalert";
import Loader from "../../../loader/Loader.vue";

export default {
	components: {
		Loader,
	},
	props: ["repoId"],
	setup(props) {
		const repositories = ref([]);
		const data = ref();
		const loading = ref(false);
		const error = ref(false);

		const handleSearch = async () => {
			if (!props.repoId) return;
			loading.value = true;
			error.value = false;

			try {
				let response = await axios.get(`https://api.github.com/users/ukaoha`);

				let repos = await axios.get(`${response.data.repos_url}?sort=created`);
				repositories.value = repos.data;

				data.value = repositories.value.filter(
					(item) => item.id == props.repoId
				)[0];

				loading.value = false;
			} catch (error) {
				console.log({ error });
				if (error.message == "Network Error") {
					swal("Oops!", "Check your internet connection then try again", "error");
				} else {
					swal("Oops!", "Something went wrong, please try again", "error");
				}
			}
		};

		handleSearch();

		const handleDate = (d) => {
			let date = new Date(d);
			return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
		};

		return {
			loading,
			handleDate,
			error,
			data,
		};
	},
};
</script>

<style scoped>
.wrapper {
	width: 80%;
	margin: 0 auto;
}

h3 {
	color: var(--primary-color);
}

.details {
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: space-between;
}

.details p {
	border-bottom: 1px dashed var(--primary-color);
	border-radius: 8px;
	padding: 10px;
	width: 60%;
	color: var(--secondary-color);
}

p span {
	color: var(--secondary-color);
	font-weight: bold;
}

a {
	display: inline-block;
	margin-top: 14px;
	color: var(--primary-color);
	transition: color 0.5s ease;
}
a:hover {
	color: var(--secondary-color);
}

@media screen and (max-width: 760px) {
	.details p {
		width: 100%;
	}
}
</style>
