import Link from 'next/link'
import Image from 'next/image'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import {columns} from '@/components/table/columns';
import { DataTable } from '@/components/table/DataTable';



const Admin = async () => {
    const appointments = await getRecentAppointmentList();
  return (
    <div className='flex relative mx-auto max-w-7xl flex-col space-y-14'>
        <header className='mt-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg xl:px-12'>
            <Link href="/" className='cursor-pointer'>                 
                <div className='flex flex-wrap items-center'>
                    <Image src="/assets/icons/log.png" alt="logo" width={1000} height={1000} className='h-14 w-fit' />
                    <p className='text-[#24ae7c] font-extrabold text-lg'>Health Care</p>
                </div>
            </Link>
            <p className='text-16-semibold'>
                <span className='text-black-500 text-green-500 uppercase'>Admin Dashboard</span>
            </p>
        </header>
        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>
                    Welcome, Admin!
                </h1>
                <p className='text-dark-700'>
                    Start the day managing your health care system.
                </p>
            </section>
            <section className='admin-stat'>
                <StatCard 
                    type='appointments' 
                    count={appointments.scheduledCount} 
                    label='Schedule appointments'
                    icon='/assets/icons/appointments.svg'
                />
                <StatCard 
                    type='pending' 
                    count={appointments.pendingCount} 
                    label='Pending appointments'
                    icon='/assets/icons/pending.svg'
                />
                <StatCard 
                    type='cancelled' 
                    count={appointments.cancelledCount} 
                    label='Cancelled appointments'
                    icon='/assets/icons/cancelled.svg'
                />
            </section>            
            <DataTable columns={columns} data={appointments.documents} />             
        </main>
    </div>
  )
}

export default Admin