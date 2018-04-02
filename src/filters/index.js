export const getdatefromtimestamp = function (input, bool) {
	let now = new Date(Number(input))
	let year = now.getFullYear()
	let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
	let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
	let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
	let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
	let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
	if (bool) {
		return year + "-" + month + "-" + date
	}else {
		return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
	}
}