<template>
	<Shell>
		<Header></Header>
		<div class="index"></div>
	</Shell>
</template>
<script setup lang="ts">
import Shell from "components/shell/Shell.vue";
import Header from "components/header/Header.vue";
</script>
<style scoped lang="stylus">
.index
	width 100%
	flex 1
	background-color lightblue
</style>
