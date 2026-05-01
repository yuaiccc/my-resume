const regex = /(^|[^\w*])\*(?!\s)([^*]+?)\*(?!\s)([^*]+?)(?<!\s)\*([^*]+?)(?<!\s)\*(?=[^\w*]|$)/g;
const str = "hello *...Some Text *Nested* More...* world";
console.log(str.replace(regex, "$1*$2**$3**$4*"));
