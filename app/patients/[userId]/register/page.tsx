import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image'
import Link from 'next/link'

const Register = async ({params: {userId}}: SearchParamProps) => {
  const user = await getUser(userId); 
  return (
    <div className="flex h-screen max-h-screen">      
      <section className="remove-scrollbar container"> 
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image src="/assets/icons/logo-full.svg" alt="logo" width={1000} height={1000} className='mb-12 h-10 w-fit' />

          <RegisterForm user={user} />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className='py-12 copyright'>
              © 2024 Health Care. All rights reserved.
            </p>            
          </div>
        </div>
      </section>
      {/* <Image src="/assets/images/register-img.png" alt="register"  */}
      <Image src="/assets/images/doctor4.webp" alt="register" 
      width={1000} height={1000} className='side-img max-w-[396px]' />

    </div>
  )
}

export default Register