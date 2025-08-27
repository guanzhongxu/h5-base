<template>
	<Shell>
		<Header></Header>
		<div class="index">
			<input type="file" class="file-input" accept="image/*" ref="inputRef" @change="handleFileChange" />
			<h1>图片在线转换/压缩</h1>
			<p>在线压缩图片文件大小，支持JPG、BMP、PNG等多种格式的图片在线压缩</p>
			<van-row gutter="16" class="mode-list">
				<van-col :span="8" v-for="item in modeList" :key="item.value">
					<van-button type="primary" block :plain="item.value !== currentMode" @click="handleMode(item.value)">{{ item.label }}</van-button>
				</van-col>
			</van-row>
			<!-- 图片上传区域 -->
			<div class="upload-area" @click="handleUpload">
				<p>点击上传图片</p>
			</div>

			<ul>
				<li class="result-list-title">转换结果列表</li>

				<li class="result-list-item">
					<FileItem />
				</li>
				<li class="result-list-item">
					<FileItem />
				</li>
				<li class="result-list-item">
					<FileItem />
				</li>
			</ul>
		</div>
	</Shell>
</template>
<script setup lang="ts">
import Shell from "components/shell/Shell.vue";
import Header from "components/header/Header.vue";
import FileItem from "./components/fileItem/Index.vue";

import useMode from "./hooks/useMode";
import useUploadFile from "views/index/hooks/useUploadFile";
const { modeList, currentMode, handleMode } = useMode();
const { inputRef, handleUpload, handleFileChange } = useUploadFile();
</script>
<style scoped lang="stylus">
.index
	width 100%
	flex 1
	background-color #fff
	box-sizing border-box
	padding 0 16px
	> h1
		font-size 24px
		font-weight bold
		text-align center
		color #333
		border-radius 10px
		margin-top 40px
	> p
		text-align center
		color #333
		border-radius 10px
		margin-top 20px
		box-sizing border-box
		padding 0 20px
	> .mode-list
		margin-top 20px
	> .upload-area
		margin-top 20px
		border-radius 10px
		box-sizing border-box
		width 100%
		height 200px
		background-color #f5f5f5
		display flex
		align-items center
		justify-content center
		cursor pointer
		border 1px dashed #999
		> p
			width 100%
			text-align center
			color #999
			font-size 16px
			font-weight bold

	> .file-input
		display none
	> ul
		margin-top 20px
		border 1px solid #ccc
		border-radius 6px
		padding 10px
		box-sizing border-box
		padding-top 0
		li
			margin-bottom 10px
			&.result-list-title
				font-size 16px
				font-weight bold
				color #333
				text-align center
				margin-bottom 10px
				border-bottom 1px solid #ccc
				height 40px
				line-height 40px
			&:last-of-type
				margin-bottom 0
</style>
