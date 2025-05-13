# 📝 CollabDoc - Google Docs Clone

![CollabDoc Banner](https://placehold.co/1200x400/4F46E5/FFFFFF?text=CollabDoc%20-%20Real-time%20Collaborative%20Editing) 
*(Consider adding an actual banner image here)*

A real-time collaborative text editor inspired by Google Docs, built with modern web technologies. Experience seamless multi-user editing with live presence indicators and rich text formatting.

## 🌟 Live Demo

➡️ [Try it now!](https://collabdoc.vercel.app)

## 📦 GitHub Repository

🔗 [github.com/kushc225/google-docs-clone](https://github.com/kushc225/google-docs-clone)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 👥 **Multi-user Collaboration** | Edit documents simultaneously with others in real-time |
| 🔄 **Instant Syncing** | Changes appear instantly across all clients |
| 👀 **Presence Indicators** | See who's currently viewing/editing the document |
| 🔒 **Secure Auth** | Protected by Clerk authentication |
| 🎨 **Rich Text Editing** | Full-featured editor with formatting options |
| ⚡ **Blazing Fast** | Optimized performance with Next.js 15 |

---

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: Shadcn UI (or your actual UI library)
- **Editor**: Tiptap (ProseMirror-based)

### Backend
- **Realtime DB**: Convex
- **Collaboration**: Liveblocks
- **Auth**: Clerk

### Infrastructure
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions (if applicable)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Convex account
- Clerk account

### Installation
```bash
git clone https://github.com/kushc225/google-docs-clone.git
cd google-docs-clone
npm install


## 🔧 Configuration

Create a `.env` file in your project root with the following content:

```ini
# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_CLERK_FRONTEND_API=your_frontend_api_here

# Convex Backend
CONVEX_DEPLOYMENT_URL=your_convex_deployment_url_here

# start development server
npm run dev
