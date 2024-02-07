<template>
	<van-pull-refresh
		:model-value="refreshLoading"
		@refresh="emits('onRefresh')"
		:head-height="headHeight"
		class="shell"
		:disabled="refreshDisabled || scrollTop > 0"
	>
		<!-- 下拉过程提示 -->
		<template #pulling="props">
			<slot name="iPulling" :props="props">
				<Loading :head-height="headHeight" :distance="props.distance" />
			</slot>
		</template>
		<!-- 释放提示 -->
		<template #loosing>
			<slot name="iLoosing">
				<Loading :head-height="headHeight" :distance="headHeight" />
			</slot>
		</template>
		<!-- 加载提示 -->
		<template #loading>
			<slot name="iLoading">
				<Loading :head-height="headHeight" :distance="headHeight" :move="true" />
			</slot>
		</template>
		<van-list
			ref="shellRef"
			:style="shellStyle"
			:loading="loading"
			:finished="finished"
			:offset="offset"
			:loading-text="loadingText"
			:finishedText="finishedText"
			:errorText="errorText"
			:immediateCheck="immediateCheck"
			:disabled="disabled"
			@load="emits('onLoad')"
			class="list removeScrollbar"
		>
			<slot></slot>
		</van-list>
	</van-pull-refresh>
</template>

<script lang="ts" setup>
// 参考vant官方文档 https://vant-contrib.gitee.io/vant/#/zh-CN/list
import useScrollTop from "components/shell/hooks/useScrollTop";
import Loading from "components/loading/Loading.vue";
interface IProps {
	shellStyle?: Record<string, string | number>;
	loading?: boolean;
	finished?: boolean;
	offset?: number;
	loadingText?: string;
	finishedText?: string;
	errorText?: string;
	immediateCheck?: boolean;
	disabled?: boolean;
	refreshLoading?: boolean;
	refreshDisabled?: boolean;
	headHeight?: number;
}

interface IEmits {
	(eventName: "onLoad"): void;
	(eventName: "onRefresh"): void;
}

const emits = defineEmits<IEmits>();
withDefaults(defineProps<IProps>(), {
	shellStyle: () => ({}),
	loading: false,
	finished: true,
	offset: 300,
	loadingText: "加载中...",
	finishedText: "",
	errorText: "",
	immediateCheck: true,
	disabled: false,
	headHeight: 100,
	refreshDisabled: true
});
const { shellRef, scrollTop } = useScrollTop();
</script>

<style lang="stylus" scoped>
.shell
  width 100%
  height 100%

  .list
    width 100%
    height 100%
    overflow-y auto
    display flex
    flex-direction column
</style>
