import type { ReactNode } from 'react';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import styles from './MarketingLayout.module.css';

interface MarketingLayoutProps {
  children: ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className={styles.shell}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Sticky Slim Header (56px) with scroll-spy & native <dialog> mobile menu */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className={styles.main}>
        {children}
      </main>

      {/* Global 4-column trust ledger & sovereignty baseline */}
      <Footer />

      {/* Sovereign AI Chat Shell */}
      <ChatWidget />
    </div>
  );
}

export default MarketingLayout;
