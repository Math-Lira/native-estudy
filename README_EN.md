# Native Estudy 📚📱

Mobile application developed in **React Native + TypeScript** focused on improving knowledge in Mobile development.

---

## 📌 Description

**Native Estudy** is an application designed for study purposes that allows users to:

- Organize players by groups and teams.
- Add new players and groups.
- Remove players and groups.

Although still in its early development stage, the project's structure is designed to facilitate future feature expansion.

---

## 🚀 Technologies

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo](https://expo.dev/) (via `app.json`)
- Components and navigation optimized for mobile

---

## 🧠 Partial Features

- ✅ Listing content organized by theme (via `playerGetByGroup`).
- ✅ Local data storage and retrieval using DTOs and configuration (`PlayerStorageDTO.ts`, `storageConfig.ts`).
- 🚧 Upcoming features: note-taking system, reminders, study timer, and learning progress tracking.

---

## 🗂️ Project Structure

```
native-estudy/
├── assets/                  # Static resources (images, icons, etc.)
├── src/
│   ├── storage/             # Functions for local data read/write
│   ├── theme/               # Global themes and styles
│   └── utils/               # Utilities such as `AppError`
├── App.tsx                  # Main entry point of the app
├── babel.config.js          # Babel configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
└── app.json                 # Expo configuration
```

---

## ▶️ How to Run the Project

1. **Clone the repository:**

```bash
git clone https://github.com/Math-Lira/native-estudy.git
cd native-estudy
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Start the app using Expo:**

```bash
npx expo start
```

4. **Use the Expo Go app on your phone** or emulator to test the app.

---

## ✍️ Author

Developed by **Matheus Lira**.  
[GitHub - @Math-Lira](https://github.com/Math-Lira)
