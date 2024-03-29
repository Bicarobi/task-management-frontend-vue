<template>
	<div class="task-card-container">
		<div class="task-card-bar">
			<div>...</div>
		</div>
		<div class="task-bar-content">
			<div class="task-title">{{ title }}</div>
			<div class="task-description">{{ description }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TaskCard",
	props: ["title", "description", "status"],
};
</script>
