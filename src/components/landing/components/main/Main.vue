<template>
	<Loader v-if="loading" />
	<main v-if="!loading && data">
		<section class="username_container">
			<div class="bio-update">
				<div>
					<img class="profile_img" :src="data.avatar_url" alt="" />
				</div>
				<div class="bio">
					<div>
						<h2>{{ data.name }}</h2>
						<p><i class="fa fa-github" aria-hidden="true"></i> {{ data.login }}</p>
					</div>
					<div>
						<p class="date_joined">
							<i class="fa fa-calendar" aria-hidden="true"></i>
							{{
								new Date(data.created_at).toLocaleDateString("en-us", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})
							}}
						</p>
					</div>
				</div>
			</div>
			<div class="bio_wrap">
				<p>{{ data.bio }}</p>
			</div>

			<div class="repos__container">
				<div class="repos">
					<h4>Public Repos</h4>
					<h2>{{ data.public_repos }}</h2>
				</div>
				<div class="repos">
					<h4>Followers</h4>
					<h2>{{ data.followers }}</h2>
				</div>
				<div class="repos">
					<h4>Following</h4>
					<h2>{{ data.following }}</h2>
				</div>
			</div>
			<div class="location__container">
				<div class="location">
					<span><i class="fa fa-solid fa-map-marker"></i>{{ data.location }}</span>
				</div>
				<div class="location">
					<span
						><i class="fa fa-brands fa-twitter-square"></i
						><a target="_blank" href="https://twitter.com/chixobam">Twitter</a></span
					>
				</div>
				<div class="location">
					<span>
						<i class="fa fa-solid fa-link"></i
						><a target="_blank" :href="data.html_url">Visit profile</a></span
					>
				</div>
			</div>
		</section>
		<section class="repo-wrapper">
			<div
				style="display: flex; align-items: center; justify-content: space-between"
			>
				<h4>My Repositories</h4>
				<p>Page {{ page }}</p>
			</div>
			<div
				class="repo"
				v-for="repo in repositories"
				:key="repo.id"
				v-if="repositories"
			>
				<router-link :to="{ name: 'repo-details', params: { id: repo.id } }">
					{{ repo.name }}
				</router-link>
			</div>

			<div class="pagination">
				<div>
					<button class="disabled" v-if="page == 1">
						<i class="fa fa-arrow-left"></i>
					</button>
					<button v-else @click="handlePrev">
						<i class="fa fa-arrow-left"></i>
					</button>
				</div>
				<div>
					<button class="disabled" v-if="page >= Math.floor(data.public_repos / 10)">
						<i class="fa fa-arrow-right"></i>
					</button>

					<button v-else @click="handleNext">
						<i class="fa fa-arrow-right"></i>
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import { ref, watch, watchEffect } from "vue";
import axios from "axios";
import swal from "sweetalert";
import Loader from "../../../loader/Loader.vue";

export default {
	components: {
		Loader,
	},
	setup() {
		const data = ref(null);
		const loading = ref(false);
		const error = ref(false);
		const page = ref(1);
		const repositories = ref([]);
		let date = ref();

		watch(page, async () => {
			let repos = await axios.get(
				`${data.value.repos_url}?per_page=10&page=${page.value}&sort=created`
			);
			repositories.value = repos.data;
		});

		const handleSearch = async () => {
			loading.value = true;
			error.value = false;
			repositories.value = [];
			try {
				let response = await axios.get(`https://api.github.com/users/Ukaoha`);
				data.value = response.data;
				date.value = new Date(data.value.created_at);
				let repos = await axios.get(
					`${data.value.repos_url}?per_page=10&page=${page.value}&sort=created`
				);

				loading.value = false;
				repositories.value = repos.data;
			} catch (error) {
				console.log({ error });
				if (error.message == "Network Error") {
					swal("Oops!", "Check your internet connection then try again", "error");
				} else {
					swal("Oops!", "Something went wrong, please try again", "error");
				}

				loading.value = false;
			}
		};
		handleSearch();

		const handlePrev = () => (page.value = page.value - 1);
		const handleNext = () => (page.value = page.value + 1);

		return {
			loading,
			handleSearch,
			date,
			error,
			data,
			page,
			repositories,
			handleNext,
			handlePrev,
		};
	},
};
</script>

<style scoped>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

main {
	font-family: "Poppins", sans-serif;
	font-weight: 300;
	font-size: 16px !important;
	color: var(--light-dark-gray);
	line-height: 1.9;
	background-color: var(--main-background-color);
	width: 99%;
	font-size: 1.5rem;
	margin: auto;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
}
.title {
	display: flex;
	justify-content: space-between;
}
.title h2 {
	text-decoration: none;
	color: #222;
}
.light .title h2 {
	color: #fff;
}
.title span {
	font-size: 1.5rem;
}
.search_section {
	display: flex;
	height: 50px;
	padding: 2px;
	background-color: var(--main-background-color);
	box-shadow: 0 0 3rem rgba(0 0 0 / 0.075);
	min-width: 18% !important;
	border-radius: 0.1rem;
}
.light .search_section {
	background-color: var(--secondary-color);
}
.search-data {
	width: 100%;
	height: 100%;
	padding: 12px 0px;
	color: #222;
	outline: none;
	font-size: 1.5rem;
	border: none;
	font-weight: 500;
	background: none;
}
.light .search-data {
	color: var(--main-background-color);
}
.search_btn {
	padding: 10px 20px;
	color: #fff;
	font-size: 1.5rem;
	background-color: var(--primary-color);
	border: none;
	outline: none;
	/* border-top-right-radius: 12px; */
	/* border-bottom-right-radius: 12px; */
	cursor: pointer;
	transition: 0.2s all;
}

.search_section svg {
	color: var(--primary-color);
	/* width: 40px; */
	text-align: center;
	margin: 0 10px;
	padding: 5px;
	line-height: 3rem;
	font-size: 2rem;
	cursor: pointer;
}
.username_container {
	background-color: var(--main-background-color);
	box-shadow: 0 0 8rem rgba(0 0 0 / 0.075);

	margin-top: 10px;
	border-radius: 0.75rem;
	padding: 3rem 1.5rem;
	margin-bottom: 20px;
	/* display: none; */
}
.bio-update {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
}
.profile_img {
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
	margin-right: 30px;
}
.bio_wrap {
	text-align: center;
	width: 100%;
	margin-bottom: 30px;
}
.repos__container {
	display: flex;
	padding: 1rem;
	background-color: var(--light-pale-blue);
	color: #fff;
	justify-content: space-between;
	margin-bottom: 30px;
	font-weight: 100;
	border-radius: 1rem;
}
.location__container {
	display: flex;
	flex-direction: column;
}
.light .username_container {
	background-color: var(--secondary-color);
}
.location i {
	margin-right: 30px;
}
.location a {
	text-decoration: none;
	color: var(--light-dark-gray);
}
.light .location a {
	color: var(--main-background-color);
}
/* meduim devices */
@media only screen and (min-width: 768px) {
	.location__container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		column-gap: 10px;
		row-gap: 20px;
	}
}

@media only screen and (min-width: 1000px) {
	main {
		width: 50%;
	}
	.bio-update {
		display: flex;
	}
	.location__container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		column-gap: 10px;
		row-gap: 20px;
	}
	.bio {
		display: flex;
		justify-content: space-around;
		margin-right: 3opx;
	}
	.date_joined {
		margin-top: 10px;
		margin-left: 100px;
		font-size: 16px;
	}
	.profile_img {
		width: 15rem;
		height: 15rem;
		border-radius: 50%;
		margin-right: 30px;
	}

	.repos__container {
		display: flex;
		padding: 2rem 3rem;
		background-color: var(--light-pale-blue);
		justify-content: space-between;
		margin-bottom: 30px;
		font-weight: 100;
		border-radius: 1rem;
	}
}

.repo-wrapper {
	padding: 15px;
	margin-bottom: 60px;
}

.repo-wrapper h4 {
	color: var(--primary-color);
}
.repo {
	padding: 10px;
	border-bottom: 2px solid var(--light-pale-blue);
	border-radius: 8px;
}

.repo a {
	color: var(--light-pale-blue);
}

.repo a:hover {
	color: var(--secondary-color);
}

.pagination {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20px 0;
}

.pagination button {
	outline: none;
	border: none;
	padding: 12px;
	cursor: pointer;
	color: #000;
}

.pagination button:hover:not(.pagination button.disabled) {
	background-color: var(--light-pale-blue);
}

.pagination button.disabled {
	cursor: not-allowed;
	opacity: 0.6;
}
</style>
