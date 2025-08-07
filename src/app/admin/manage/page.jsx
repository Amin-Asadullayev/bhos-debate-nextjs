import Navbar from '@/components/Navbar'
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ManageAll from '@/components/ManageAll';

const ADMIN_EMAILS = process.env.AUTHORIZED_EMAILS.split(",");

export default async function App() {
    const session = await getServerSession(authOptions);
    if (!session || !ADMIN_EMAILS.includes(session.user.email)) {
        redirect("/login");
    }

    return (
        <>
            <Navbar />
            <ManageAll />
        </>
    )
}