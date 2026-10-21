import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/money/dashboard';
import { moneyHead } from '@/lib/metadata';
export const Route = createFileRoute('/')({head:()=>moneyHead('Your money. Your rules.','Lihat saldo, ruang spending, target income, dan kewajiban lo dengan Money Tracker. Personal, ringan, dan tersimpan di browser.'),component:Dashboard});
