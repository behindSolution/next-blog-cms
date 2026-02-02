'use client';

import './styles/generated.css';
import AdminApp, { type AdminAppProps } from './App';
import { I18nProvider, type TranslateFn } from './i18n';

export interface BlogAdminProps {
  locale?: string;
  messages?: Record<string, string>;
  translate?: TranslateFn;
  branding?: AdminAppProps['branding'];
}

export const BlogAdmin = ({ locale, messages, translate, branding }: BlogAdminProps) => (
  <I18nProvider locale={locale} messages={messages} translate={translate}>
    <AdminApp branding={branding} />
  </I18nProvider>
);

export const BlogAdminPage = (props: BlogAdminProps) => <BlogAdmin {...props} />;

export type { TranslateFn, TranslateParams } from './i18n';

export default BlogAdmin;

