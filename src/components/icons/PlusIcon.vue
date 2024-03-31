<template>
	<div>
		<svg viewBox="0 0 448 512">
			<path
				d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	name: "PlusIcon",
};
</script>

<style scoped>
div {
	line-height: 0;
	cursor: pointer;

	position: relative;
}

div:hover {
	path {
		fill: var(--color2);
	}
}

svg {
	height: 20px;
}

path {
	fill: var(--color3);
}
</style>
