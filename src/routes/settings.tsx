import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/components/money/pages';
import { moneyHead } from '@/lib/metadata';
export const Route = createFileRoute('/settings')({ head:()=>moneyHead('Your settings','Atur target income, safe money, kebutuhan rutin, dan backup data pribadi lo.'),component:()=><SettingsPage/> });
