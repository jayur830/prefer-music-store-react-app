// Date.prototype.format = function (f): string {
// 	if (!this.valueOf()) return "";
// 	let weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
// 	let weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
// 	let weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// 	let weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// 	let d = this;
// 	return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi,
// 			function ($1) {
// 				switch ($1) {
// 				case "yyyy": return d.getFullYear();
// 				case "yy": return (d.getFullYear() % 1000).zf(2);
// 				case "MM": return (d.getMonth() + 1).zf(2);
// 				case "dd": return d.getDate().zf(2);
// 				case "KS": return weekKorShortName[d.getDay()];
// 				case "KL": return weekKorName[d.getDay()];
// 				case "ES": return weekEngShortName[d.getDay()];
// 				case "EL": return weekEngName[d.getDay()];
// 				case "HH": return d.getHours().zf(2);
// 				case "hh": 
// 					const h = d.getHours();
// 					return (h % 12 ? h : 12).zf(2);
// 				case "mm": return d.getMinutes().zf(2);
// 				case "ss": return d.getSeconds().zf(2);
// 				case "a/p": return d.getHours() < 12 ? "오전" : "오후";
// 				default: return $1;
// 				}
// 			});
// };

// String.prototype.string = function (len: number): string {
// 	let s: string = '';
// 	for (let i: number = 0; i < len; ++i) s += this;
// 	return s;
// };
// String.prototype.zf = function (len: number): string { return "0".string(len - this.length) + this; };
// Number.prototype.zf = function (len: number): string { return this.toString().zf(len); };

type DateType = Date | string | number;

const zero = (value: number | string): number | string => value.toString().length === 1 ? `0${value}` : value;

export let dateFormater = (format: string, date: DateType = Date.now()): string => {
    const allowForm: string = date.toString().replace(/\.|\-|\s+/g, "/");
    const _date: Date = new Date(allowForm);

    return format.replace(/(yyyy|mm|dd|MM|DD|H|i|s)/g, (t: string): any => {
        switch (t) {
            case "yyyy":
                return _date.getFullYear();
            case "mm":
                return _date.getMonth() + 1;
            case "dd":
                return _date.getDate();
            case "MM":
                return zero(_date.getMonth() + 1);
            case "DD":
                return zero(_date.getDate());
            case "H":
                return zero(_date.getHours());
            case "i":
                return zero(_date.getMinutes());
            case "s":
                return zero(_date.getSeconds());
            default:
                return "";
        }
    });
};