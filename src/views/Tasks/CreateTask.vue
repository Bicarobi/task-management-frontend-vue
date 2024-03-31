<template>
	<div v-if="this.$myGlobalVariable.username">
		<form @submit.prevent="handleSubmit" v-on:keydown.enter.prevent>
			<label>Title:</label>
			<input type="text" required v-model="title" />

			<label>Description:</label>
			<textarea
				type="text"
				onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
				onfocusout='this.style.height = "";'
				oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
				required
				v-model="description"
			></textarea>

			<div class="submit">
				<button>Create a Task</button>
			</div>
		</form>
		<div>{{ title }}</div>
		<div>{{ description }}</div>
	</div>
	<div v-else>Not logged in!</div>
</template>

<script>
export default {
	data() {
		return {
			title: "",
			description: "",
		};
	},
	methods: {
		handleSubmit() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: "Bearer " + this.$myGlobalVariable.accessToken },
				body: JSON.stringify({ title: this.title, description: this.description }),
			};

			fetch(process.env.VUE_APP_BASE_URL + "/tasks", requestOptions).then((res) => console.log(res.json()));
		},
	},
};
</script>

<style></style>
