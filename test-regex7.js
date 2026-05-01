const regex = /(?<=^|\W|_)\*(?!\s)([^*]+?)\*(?!\s)([^*]+?)(?<!\s)\*([^*]+?)(?<!\s)\*(?=\W|_|$)/g;
const str = "_*...Some Text *Nested* More...*_";
console.log(str.replace(regex, "*$1**$2**$3*"));
