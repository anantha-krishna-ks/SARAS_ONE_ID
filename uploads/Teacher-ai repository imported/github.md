repo: anantha-krishna-ks/Teacher-ai
branch: main

## Last sync
date: 2026-08-13T07:58:00Z

### Updated in this project
- Full UI/UX revamp to SARAS UX Standard (uploads/Skills (1).md): SARAS blue tokens +
  Poppins in src/index.css, login/setup/reader/panels/modals restyled, violet/cyan swept
  to blue, motion polish (Emil Kowalski curves + press/hover), prefers-reduced-motion.
- New src/components/Icon.jsx premium stroke-icon set; ALL emoji replaced with icons across
  BookReader header/toolbar, App.jsx chat cards + loaders + print, QuizPanel, HomeworkPanel,
  HomeworkSetupModal, LearningOutcomesModal, TeacherVoiceModal, MediaPipeVision,
  AvatarSelectionScreen. Dropdown gained aria-label. Workflow/state/API untouched.
- Preview runtime: preview.html + loader.js (in-browser JSX transpile), avatars via
  src/avatarModels.js (met4citizen/TalkingHead models over raw.githubusercontent).
- Vite + React 19 app; entry index.html → src/main.jsx → src/App.jsx

## Sync history
- 2026-08-13T07:08:09Z — imported full repo (35 files) at HEAD of main.

## Screen map
| Screen | Source files |
| --- | --- |
| App shell / routing | src/App.jsx, src/main.jsx |
| Login | src/components/LoginScreen.jsx |
| Avatar selection | src/components/AvatarSelectionScreen.jsx, src/components/AvatarCanvas.jsx |
| Book reader | src/components/BookReader.jsx |
| Quiz / chat | src/components/ChatQuiz.jsx, src/components/QuizPanel.jsx |
| Homework | src/components/HomeworkPanel.jsx, src/components/HomeworkSetupModal.jsx |
| Learning outcomes | src/components/LearningOutcomesBanner.jsx, src/components/LearningOutcomesModal.jsx |
| Voice / live | src/components/TeacherVoiceModal.jsx, src/components/LiveInteractButton.jsx, src/hooks/useGeminiLive.js, src/hooks/useTeacherLive.js |
| Vision | src/components/MediaPipeVision.jsx |
