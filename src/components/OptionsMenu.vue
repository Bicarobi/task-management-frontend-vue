<template>
	<div class="options-menu-container">
		<MoreIcon />
		<div class="options" :style="optionsOpened ? 'display: flex' : 'display: none'" @click.stop><slot></slot></div>
	</div>
</template>

<script>
import MoreIcon from "../components/icons/MoreIcon.vue";

export default {
	name: "OptionsMenu",
	props: ["optionsOpened"],
	components: {
		MoreIcon,
	},
};
</script>
