# B — Blog Platform

A responsive blog platform built with Next.js 15 (App Router) and TypeScript, demonstrating custom hooks, Zustand state management, mock JWT authentication, persistent CRUD operations against MockAPI, a rich text editor, dark/light theming, reusable components, and a clean folder structure.

## Tech stack

- **Next.js 15** (App Router, Server Components where it makes sense)
- **TypeScript**
- **Tailwind CSS v4**
- **Zustand** — state management (`authStore`, `postStore`, `themeStore`)
- **React Hook Form** + **Zod** — form state and validation
- **Tiptap** — rich text editor for post content (HTML output)
- **DOMPurify** — sanitizes rich text before rendering
- **Axios** — API client (`axiosInstance`, `postsApiInstance`)
- **react-hot-toast** — toast notifications
- **MockAPI** — persistent REST API for posts (`https://mockapi.io`)

## Project structure

```
src/
├── app/
│   ├── (protected)/
│   │   ├── dashboard/
│   │   └── posts/
│   │       ├── [id]/
│   │       │   ├── edit/
│   │       │   └── page.tsx
│   │       └── create/
│   ├── login/
│   ├── register/
│   └── layout.tsx, page.tsx, globals.css
├── components/
│   ├── ui/
│   ├── layout/
│   ├── auth/
│   └── posts/
├── hooks/
│   ├── useAuth.ts
│   ├── useHydrateAuth.ts
│   ├── useHydrateTheme.ts
│   ├── usePosts.ts
│   └── usePost.ts
├── store/
│   ├── authStore.ts
│   ├── postStore.ts
│   └── themeStore.ts
├── services/
│   ├── axiosInstance.ts
│   ├── authService.ts
│   └── postService.ts
├── types/
└── utils/
    ├── storage.ts
    ├── format.ts
    └── validation/
```

### 1. Create a MockAPI project for posts

1. Sign up at mockapi.io and create a new project.
2. Add a resource named **posts** with these fields (MockAPI always adds `id` for you):
   - `title` — string
   - `body` — string
   - `category` — string
   - `tags` — array
   - `userId` — string
3. Copy your project's base URL, e.g. `https://663f1b1c1234567890abcdef.mockapi.io/api/v1`.
4. Copy `.env.local.example` to `.env.local` and paste it in:

   ```
   NEXT_PUBLIC_MOCKAPI_URL=https://663f1b1c1234567890abcdef.mockapi.io/api/v1
   ```

### 2. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/login`.

Other useful scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```
