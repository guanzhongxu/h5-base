<template>
	<header :class="{ pt: hasPt }" :style="headerStyle">
		<slot name="back">
			<i class="iHeader" @click="goBack">&#xe61e;</i>
		</slot>
		<slot>
			<h4 :style="titleStyle" class="one">{{ defaultTitle }}</h4>
		</slot>
		<slot name="right"></slot>
	</header>
</template>

<script lang="ts" setup>
import useRouter from "@/utils/useRouter";
import useTitle from "components/header/hooks/useTitle";
import useHasPt from "components/header/hooks/useHasPt";
import "@/assets/css/header.styl";
interface IProp {
	title?: string;
	onBack?: () => void;
	titleStyle?: Record<string, string>;
	headerStyle?: Record<string, string>;
}

const { go } = useRouter();
const { title = "", onBack, titleStyle = {}, headerStyle = {} } = defineProps<IProp>();
const { defaultTitle } = useTitle({ title });
const { hasPt } = useHasPt();
const goBack = () => {
	onBack ? onBack() : go(-1);
};
</script>

<style lang="stylus" scoped>
header
  position sticky
  top 0
  left 0
  background-color #fff
  display flex
  align-items center
  justify-content center
  box-sizing border-box
  max-height 70px
  flex none

  > h4
    text-align center
    line-height 46px
    height 46px
    max-width 80%
    font-size 16px
  > .iHeader
    width 30px
    height 46px
    display flex
    align-items center
    justify-content flex-start
    position absolute
    left 16px
</style>
