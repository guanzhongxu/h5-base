<template>
	<div class="loading">
		<div :style="{ transform: `scale(${scale}) rotateY(${deg}deg)` }" :class="{ move }">
			<i :style="{ transform: ` rotateY(-${deg}deg)` }" :class="{ left: true, move }"></i>
			<i :style="{ transform: ` rotateY(-${deg}deg)` }" :class="{ right: true, move }"></i>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface IProps {
	move?: boolean;
	distance: number;
	headHeight: number;
}

const props = defineProps<IProps>();

const scale = computed(() => props.distance / props.headHeight);
const deg = computed(() => scale.value * 360);
</script>

<style lang="stylus" scoped>
animaTime = 1s
.loading
  width 100%
  height 100%
  perspective 40px
  display flex
  flex-direction column
  justify-content center

  > div
    transform-style: preserve-3d
    width 30px
    height 10px
    display flex
    justify-content space-between
    align-items center
    margin 0 auto
    backface-visibility visible

    &.move
      animation move animaTime infinite linear
    > i
      width 8px
      height 8px
      border-radius 50%
      backface-visibility visible
      transform-style: preserve-3d;
      animation-direction reverse
      &.move
        animation move animaTime infinite linear
        animation-direction reverse
      &.left
        background-color #f00

      &.right
        background-color: #00f

@keyframes move
  0%
    transform rotateY(0)
  100%
    transform rotateY(360deg)
</style>
