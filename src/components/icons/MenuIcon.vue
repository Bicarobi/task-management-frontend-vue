<template>
	<div>
		<svg v-if="!navbarMenuOpened" viewBox="0 0 448 512">
			<path
				d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
			/>
		</svg>
		<svg v-else viewBox="0 0 384 512">
			<path
				style="fill: var(--color2)"
				d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	name: "MenuIcon",
	props: ["navbarMenuOpened"],
};
</script>

<style scoped>
div {
	line-height: 0;
}

div:hover {
	> path {
		fill: var(--color2);
	}
}

svg {
	height: 20px;
	cursor: pointer;
}

path {
	fill: var(--color3);
}
</style>
