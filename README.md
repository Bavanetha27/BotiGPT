# 🔐 BotiGPT 

BotiGPT is a playful and interactive chatbot application built with **React** and **Tailwind CSS**, featuring a unique **lock-and-key landing page**.
Users must **drag the key (🔑) into the lock (🔒)** to unlock and enter the chatbot — adding a fun, game-like experience before the conversation even starts.

---

## ✨ Features

### 🔑 **Interactive Landing Page**

* Drag-and-drop key mechanic built using pure React
* Collision detection for lock + key
* Smooth animations giving a realistic “unlock” feel
* Key snaps back if dropped wrong
* Enter username with slider modal
* Fully responsive and emoji-based UI (no images)

### 🤖 **Chatbot Interface**

* Clean chat layout with message bubbles
* A funny “worst UI” send button that tries to escape 🏃💨
* Audio send button (🎙️)
* Delete chat by **dragging the chat title into the delete bin**
* Exit button with humorous behavior
* Smooth transitions and quirky animations

### 🎨 **Tech Stack**

* **React.js**
* **Tailwind CSS**
* Custom drag logic (no external drag-drop libraries)
* Fun, interactive UX

---

## 🧠 How It Works

1. User arrives at the landing page
2. A **🔑 draggable key** and a **🔒 lock** appear
3. User drags the key towards the lock
4. The app detects overlap and **unlocks**
5. Then User want to enter username with given slider.
6. The chatbot interface appears
7. Users can chat, send messages, use the mic, or delete chats via drag-to-bin motion

---

## 📁 Project Structure

```
src/
 ├── components/
 │     ├── ExitPopup.jsx
 │     ├── SettingsModal.jsx
 │     ├── ChatInput.jsx
 |     ├── Meassage.jsx
 |     ├── MessageList.jsx
 │     ├── Header.jsx
 │     └── Footer.jsx
 ├── components/
 │     ├── LandingPage.jsx
 │     ├── ChatbotPage.jsx
 ├── App.jsx
 └── main.jsx
```

---

## 🎯 Purpose of the Project

This project was created to explore:

* Creative, non-standard UI interactions
* Custom drag-and-drop mechanics
* Playful user experience
* Animated transitions and state handling

It’s perfect for portfolios, UI experiments, and fun chatbot concepts.
