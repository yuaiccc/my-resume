const regex = /(?<=^|\W|_)\*(?!\s)([^*]+?)\*(?!\s)([^*]+?)(?<!\s)\*([^*]+?)(?<!\s)\*(?=\W|_|$)/g;
const str = "*I am* going *home*";
console.log(str.replace(regex, "*$1**$2**$3*"));
