<template>
	<div class="popup-container">
		<div v-for="message in messages" :key="message">{{ $t("popup." + message) }}</div>
	</div>
</template>

<script>
export default {
	name: "PopupModal",
	props: ["messages"],
};
</script>
