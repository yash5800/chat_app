// var chat = "hi ```java``` **hello**";
// var user_chat = chat.split(/(```.*?```|\*\*.*?\*\*)/g).filter(item => item.trim() !== "");
var user_chat = "```java```";
console.log(user_chat.replace(/```/g,''));
