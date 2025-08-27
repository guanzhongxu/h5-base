const useUploadFile = () => {
	const inputRef = ref<HTMLInputElement | null>(null);

	const handleUpload = () => {
		if (inputRef.value) {
			inputRef.value.click();
		}
	};

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			// 处理文件上传
			console.log("文件已选择:", target.files);
		}
	};

	return {
		inputRef,
		handleUpload,
		handleFileChange
	};
};

export default useUploadFile;
