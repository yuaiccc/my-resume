const regex = /(^|[^\w*])\*(?!\s)([^*]+?)\*(?!\s)([^*]+?)(?<!\s)\*([^*]+?)(?<!\s)\*(?=[^\w*]|$)/g;
const str = "*...Some Text *Nested Emphasis Text* More text...*";
console.log(str.replace(regex, "$1*$2**$3**$4*"));
