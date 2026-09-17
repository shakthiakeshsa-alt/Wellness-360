// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Janashakthi Wellness 360',
  description: 'Corporate Wellness Activation & Queue Management Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F8F9FA] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
