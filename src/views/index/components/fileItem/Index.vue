<template>
	<div class="file-item">
		<div
			class="img"
			:style="{ backgroundImage: `url(https://img1.baidu.com/it/u=3273686700,440353769&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500)` }"
		></div>
		<div class="info">
			<div class="fileName">文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名</div>
			<div class="size">
				<span>源文件大小：124MB</span>
			</div>
			<div class="size">
				<span>源文件大小：124MB</span>
			</div>
			<div class="size ratio">
				<div>
					<span>压缩比例:</span>
					<span>10%</span>
				</div>
				<div>
					<van-button type="success" size="mini">下载</van-button>
					<van-button type="danger" size="mini">删除</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="stylus">
.file-item
	display flex
	font-size 13px
	justify-content space-between
	> .img
		width 100px
		height 100px
		border-radius 6px
		background-size cover
		background-position center
		background-repeat no-repeat
	> .info
		width 210px
		height 100px
		> .fileName
			width 100%
			height 40px
			line-height 20px
			nLine(2)
		> .size
			width 100%
			display flex
			justify-content space-between
			align-items center
			> span
				height 20px
				line-height 20px
			&.ratio
				display flex
				justify-content space-between
				align-items center
				> span
					color #0f0
</style>
