
import Link from 'next/link'
import Image from 'next/image'
import { PatientForm } from '@/components/forms/PatientForm'
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Success = async ({params: {userId}, searchParams}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(doctor => doctor.name === appointment.primaryPhysician);
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className='success-img'>
        <Link href="/">
          <Image src="/assets/icons/logo-full.svg" alt="logo" width={1000} height={1000} className='h-10' />
        </Link>
        <section className='flex flex-col items-center'>
          <Image src="/assets/icons/check-circle.svg" alt="success" className='mt-14 mx-auto' width={100} height={100} />          
          <h2 className='header mb-6 max-w-[600px] text-center'> 
              Your <span className='text-green-400'>appointment request</span> has been successfully submitted!
            </h2>
            <p>We'll be in touch shortly to confirm.</p>             
        </section>
        <section className='request-details'>
          <p>Requested appointment details:</p>          
          <div className='flex items-center gap-3'>
            <Image src={doctor?.image!} alt='doctor' width={100} height={100} className='size-6' />    
            <p>Dr. {doctor?.name}</p>      
          </div>
          <div className='flex items-center gap-3'>
            <Image src='/assets/icons/calendar.svg' alt='calendar' width={100} height={100} className='size-6' />                 
            <p>{formatDateTime(appointment.schedule).dateTime}</p>              
          </div>
        </section>
        <Button variant='outline' className='shad-primary-btn' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
        </Button>

        <p className='copyright'>
          © 2024 Health Care. All rights reserved.
        </p>         

      </div>      
    </div>
  )
}

export default Success


