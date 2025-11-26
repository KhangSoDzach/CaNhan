# Portfolio Website

Portfolio cá nhân được xây dựng với React + Vite + Tailwind CSS.

## 🚀 Hướng dẫn chạy local

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình API Key (Tùy chọn - chỉ cần nếu dùng chatbot)

Tạo file `.env` và thêm API key của Gemini:

```bash
cp .env.example .env
```

Sau đó mở file `.env` và thay thế `your_api_key_here` bằng API key thực:

```
VITE_GEMINI_API_KEY=AIzaSy...
```

**Lấy API key tại:** https://aistudio.google.com/app/apikey

> **Lưu ý:** Nếu không dùng chatbot AI, bạn có thể bỏ qua bước này.

### 3. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

### 4. Build cho production

```bash
npm run build
```

## 📦 Deploy lên Vercel

### Cách 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. Push code lên GitHub repository
2. Truy cập [vercel.com](https://vercel.com)
3. Click **"Add New Project"**
4. Import repository từ GitHub
5. Vercel sẽ tự động detect Vite project
6. Thêm Environment Variable (nếu dùng chatbot):
   - Key: `VITE_GEMINI_API_KEY`
   - Value: API key của bạn
7. Click **"Deploy"**

### Cách 2: Deploy qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Google Gemini API** - AI Chatbot (tùy chọn)

## 📁 Cấu trúc thư mục

```
.
├── src/
│   ├── App.jsx          # Component chính
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite config
├── tailwind.config.js   # Tailwind config
└── vercel.json          # Vercel config
```

## 🔒 Bảo mật

- **KHÔNG** commit file `.env` lên GitHub
- File `.env` đã được thêm vào `.gitignore`
- Trên Vercel, thêm API key qua Environment Variables

## 📝 Tùy chỉnh nội dung

Mở file `src/App.jsx` và chỉnh sửa các object:

- `PERSONAL_INFO` - Thông tin cá nhân
- `SKILLS` - Kỹ năng
- `PROJECTS` - Dự án
- `TIMELINE` - Học vấn & hoạt động

## 📄 License

MIT License - Free to use!
