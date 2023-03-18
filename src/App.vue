<template>
	<div class="app-wrapper">
		<router-view />
	</div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: "Poppins", sans-serif;
}

.content {
	width: 80%;
	margin: 0 auto;
}

a {
	text-decoration: none;
	color: inherit;
}

:root {
	--primary-color: #0079ff;
	--dark-color: #141d2f;
	--white-color: #fff;
	color: var(--white-color);
	--secondary-color: #1e2a47;
	fill: var(--white-color);
	--main-background-color: #f6f8ff;
	--main-white-color: #fefefe;
	--black-color: #222731;

	--hover-dark-color: #90a4d4;

	--light-gray-color: #697c9a;
	--light-pale-blue: #4b6a9b;
	--light-dark-gray: #2b3442;
}
h1 {
	color: black;
}

@media screen and (max-width: 760px) {
	.content {
		width: 90%;
	}
}
</style>
