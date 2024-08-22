
import Link from 'next/link'
import Image from 'next/image'
import { PatientForm } from '@/components/forms/PatientForm'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { getPatient } from '@/lib/actions/patient.actions';

export default async function NewAppointment({params:{userId}}: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">      
      <section className="remove-scrollbar container my-auto"> 
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/">            
            <div className='flex flex-wrap items-center'>
              <Image src="/assets/icons/log.png" alt="logo" width={1000} height={1000} className='h-14 w-fit' />
              <p className='text-[#24ae7c] font-extrabold text-lg'>Health Care</p>
            </div>
          </Link>
            <AppointmentForm type='create' userId={userId} patientId={patient.$id}/> 
            <div className="text-14-regular mt-20 flex justify-between">
              <p className='justify-items-end text-dark-600 xl:text-left'>
                © 2024 Health Care. All rights reserved.
              </p>          
            </div>
        </div>
      </section>
      {/* <Image src="/assets/images/appointment-img.png" alt="appointment"  */}
      <Image src="/assets/images/stethoscope2.webp" alt="appointment" 
      width={1000} height={1000} className='side-img max-w-[390px] bg-bottom' />
    </div>
  )
}

