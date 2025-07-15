// const chatMessages = document.getElementById("chatMessages");
// const chatInput = document.getElementById("chatInput");
// const sendButton = document.getElementById("sendButton");
// const typingIndicator = document.getElementById("typingIndicator");

// // پیام‌های پاسخ ثابت
// const botResponses = [
//   "سلام! چطور می‌تونم کمکتون کنم؟",
//   "این یک پاسخ نمونه از چت بات است.",
//   "متشکرم که با من صحبت می‌کنید!",
//   "چه سؤال جالبی! بذارید فکر کنم...",
//   "امیدوارم پاسخ من مفید باشه.",
//   "آیا سؤال دیگه‌ای دارید؟",
//   "من اینجا هستم تا کمکتون کنم.",
//   "بسیار عالی! چیز دیگه‌ای می‌خواید بدونید؟",
// ];

// function getCurrentTime() {
//   const now = new Date();
//   return now.toLocaleTimeString("fa-IR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function addMessage(content, isUser = false) {
//   const messageDiv = document.createElement("div");
//   messageDiv.className = `message ${isUser ? "user" : "bot"}`;

//   const avatarDiv = document.createElement("div");
//   avatarDiv.className = "message-avatar";
//   avatarDiv.textContent = isUser ? "شما" : "🤖";

//   const contentDiv = document.createElement("div");
//   contentDiv.className = "message-content";
//   contentDiv.innerHTML = `
//                 <div>${content}</div>
//                 <div class="message-time">${getCurrentTime()}</div>
//             `;

//   messageDiv.appendChild(avatarDiv);
//   messageDiv.appendChild(contentDiv);

//   chatMessages.appendChild(messageDiv);
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function showTypingIndicator() {
//   typingIndicator.style.display = "block";
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function hideTypingIndicator() {
//   typingIndicator.style.display = "none";
// }

// function sendMessage() {
//   const message = chatInput.value.trim();
//   if (message === "") return;

//   // نمایش پیام کاربر
//   addMessage(message, true);
//   chatInput.value = "";

//   // نمایش اندیکاتور تایپ
//   showTypingIndicator();

//   // شبیه‌سازی تأخیر پاسخ
//   setTimeout(() => {
//     hideTypingIndicator();

//     // انتخاب پاسخ تصادفی
//     const randomResponse =
//       botResponses[Math.floor(Math.random() * botResponses.length)];
//     addMessage(randomResponse, false);
//   }, 1000 + Math.random() * 2000); // تأخیر بین 1 تا 3 ثانیه
// }

// // Event listeners
// sendButton.addEventListener("click", sendMessage);

// chatInput.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     sendMessage();
//   }
// });

// // فوکوس روی input هنگام لود صفحه
// chatInput.focus();

// // اسکرول خودکار
// chatMessages.addEventListener("DOMNodeInserted", () => {
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });
