<template>
	<router-view v-slot="{ Component }">
		<transition :name="animationName">
			<keep-alive :include="cacheStore.cacheRouter">
				<component :is="Component" />
			</keep-alive>
		</transition>
	</router-view>
	<van-number-keyboard safe-area-inset-bottom />
</template>
<script setup lang="ts">
import "views//app/hooks/useInitStyle";
import useSize from "views/app/hooks/useSize";
import useAnimation from "views/app/hooks/useAnimation";
import useCacheRouter from "@/store/useCacheRouter";
import useInitRequestToken from "views/app/hooks/useInitRequestToken";
const { animationName } = useAnimation();
const cacheStore = useCacheRouter();
useSize();
useInitRequestToken();
</script>
<style lang="stylus">
#app
  width 375px
  height 100vh
  overflow hidden
</style>
