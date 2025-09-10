export const getDateStr = (dateObj: Date) => {
	const year = dateObj.getFullYear();
	const month = dateObj.getMonth() + 1;
	const date = dateObj.getDate();
	const hour = dateObj.getHours();
	const min = dateObj.getMinutes();
	const sec = dateObj.getSeconds();
	return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
};
