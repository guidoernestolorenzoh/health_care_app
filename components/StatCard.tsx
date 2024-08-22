import clsx from "clsx"
import Image from "next/image"

interface StatCardProps {
    type: "appointments" | "pending" | "cancelled"
    count: number
    label: string
    icon: string
}

const StatCard = ({count = 0, type, label, icon}: StatCardProps) => {
  return (
    <div className={clsx('stat-card', {
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled'
    })}>
        <div className='flex items-center gap-4'>
            <Image 
                src={icon} 
                alt={type} 
                className='w-fit size-8' 
                width={32}
                height={32}
            />
            <h3 className='text-32-bold font-bold'>{count}</h3>
        </div>
        <p className='text-18-regular'>
            {label}
        </p>
    </div>
  )
}

export default StatCard