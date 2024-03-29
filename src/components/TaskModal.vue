<template>
	<div class="task-modal-container">
		<div>{{ title }}</div>
		<div>{{ description }}</div>
	</div>
</template>

<script>
export default {
	name: "TaskModal",
	props: ["title", "description"],
};
</script>
