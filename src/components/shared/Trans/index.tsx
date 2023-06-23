import { useTranslation } from 'next-i18next';

export const Trans = ({ nameSpace, word }: { nameSpace: string; word: string }) => {
  const { t } = useTranslation(nameSpace);
  return <>{t(word)}</>;
};
