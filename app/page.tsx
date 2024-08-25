
import Link from 'next/link'
import Image from 'next/image'
import { PatientForm } from '@/components/forms/PatientForm'
import PasskeyModal from '@/components/PasskeyModal';


const Home = ({searchParams}: SearchParamProps) => {
  console.log(searchParams);
  const isAdmin = searchParams.admin === 'true';  
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      
      <section className="remove-scrollbar container my-auto"> 
        <div className="sub-container max-w-[496px]">          
          <div className='flex flex-wrap items-center'>
            <Image src="/assets/icons/log.png" alt="logo" width={1000} height={1000} className='h-14 w-fit' />
            <p className='text-[#24ae7c] font-extrabold text-lg'>Health Care</p>
          </div>

          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 Health Care. All rights reserved.
            </p>
            <Link href="/?admin=true" className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>
      {/* <Image src="/assets/images/onboarding-img.png" alt="onboarding"  */}     
      <Image src="/assets/images/onBoarding.webp" alt="onboarding" 
      width={1000} height={1000} className='side-img max-w-[50%]' />
      {/* <Image src="/assets/images/doctor3.jpeg" alt="onboarding" 
      width={1000} height={1000} className='side-img max-w-[40%]' /> */}
    </div>
  )
}

export default Home