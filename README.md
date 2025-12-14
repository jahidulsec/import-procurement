# IMPORT PROCUREMENT PROJECT

A modern and responsive **Web App** and **Admin Panel** built with **Next.js**, designed for seamless integration with APIs and optimized performance. Project Management from dashboards, content management, and data analytics interfaces.

---

## 📦 Features

- ✅ **Next.js 16+ (App Router)**
- ⚛️ **React 19** with Server Components
- 🎨 **Tailwind CSS** for utility-first styling
- 🧱 **TypeScript** support
- 🌐 **API Integration** (REST)
- ⚙️ **Reusable UI Components** with **Shadcn UI**
- 📊 **Charts** & **Tables** for data visualization
- 📁 Dynamic Routing for admin modules

---

## 📁 Folder Structure

```bash
├── app/                 # App router pages
├── components/          # Shared UI components
│   ├── shared/          # feature name
│   ├── ui/              # feature name
├── hooks/               # Custom React hooks
├── providers/           # Custom React providers
├── features/            # App features
│   ├── actions/         # server actions
│   ├── components/      # feautures apis
│   ├── servers/         # feautures apis
├── lib/                 # lib functions
├── utils/               # Utility functions
├── public/              # Static files
├── types/               # TypeScript types
├── schema/              # validation schema
├── tailwind.config.js   # Tailwind CSS config
└── next.config.js       # Next.js config
```

---

## 🚀 Getting Started

1. Clone the Repo

```bash
git clone https://github.com/jahidulsec/import-procurement.git
cd import-procurement
```

2. Install Dependencies

```bash
npm install
```

3. Create a `.env` file in the root:

```env
DATABASE_URL=
SESSION_SECRET=your-secret-key
COOKIE_SECURE="0" | "1"
```

hint: to generate secret key,

```bash
openssl rand -base64 32
```

4. Run the Dev Server

```bash
npm run dev
```

Now open [http://localhost:5012](http://localhost:5012) in your browser 🚀

5. Run the server with Docker

Run for initial build

```bash
docker-compose up -d --build
```

For rebuild,

```bash
docker-compose down
docker-compose up -d --build
```

---

## 🛠 Available Scripts

```bash
npm run dev         # Run development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run deploy      # Run deploy on product server
```
