# حساب‌یار — Professional Accounting ERP

یک رابط کاربری حرفه‌ای و قابل توسعه برای سیستم حسابداری با React + Vite.

## اجرا

```bash
npm install
npm run dev
```

سپس آدرس نمایش‌داده‌شده توسط Vite را باز کنید.

## Build

```bash
npm run build
```

## امکانات فعلی

- داشبورد مالی حرفه‌ای
- RTL و فارسی
- Dark / Light mode
- اسناد حسابداری دوطرفه
- فاکتور فروش
- مشتری و تأمین‌کننده
- کالا و انبار
- صندوق و بانک
- درخت حساب‌ها
- گزارش‌های مالی
- نمودارهای فروش و هزینه
- فرم‌های Modal
- جستجو و جدول‌های مدیریتی
- Responsive برای موبایل و دسکتاپ

## معماری پیشنهادی برای Backend

برای نسخه Production:
- NestJS یا Node.js
- PostgreSQL
- JWT + RBAC
- Redis
- Object Storage برای فایل‌ها
- API versioning
- Audit Log
- تراکنش DB برای اسناد حسابداری

این نسخه Frontend با داده‌های نمونه آماده است تا به API واقعی متصل شود.
