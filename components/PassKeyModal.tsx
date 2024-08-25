'use client'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { decryptKey, encryptKey } from '@/lib/utils'



const PasskeyModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const path = usePathname();
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

        if (path) {            
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {                
                setOpen(false);
                router.push('/admin');
            } else {
                setOpen(true);
            }
        }
    }, [encryptedKey]); 

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem('accessKey', encryptedKey);
            setOpen(false);
        } else {
            setError('Incorrect passkey. Please try again.');
        }
    }
        
    const closeDialog = () => {
        setOpen(false);
        router.push('/');
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='shad-alert-dialog'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between'>
                        Access Verification
                        <Image src='/assets/icons/close.svg' alt='close' className='cursor-pointer' width={20} height={20} onClick={() => closeDialog()} />
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-xs'>
                        To access the admin page, please enter the passkey...
                    </AlertDialogDescription>                    
                </AlertDialogHeader>
                <div>
                <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                    <InputOTPGroup className='shad-otp'>
                        <InputOTPSlot index={0} className='shad-otp-slot'/>
                        <InputOTPSlot index={1} className='shad-otp-slot'/>
                        <InputOTPSlot index={2} className='shad-otp-slot'/>
                        <InputOTPSlot index={3} className='shad-otp-slot'/>
                        <InputOTPSlot index={4} className='shad-otp-slot'/>
                        <InputOTPSlot index={5} className='shad-otp-slot'/>
                    </InputOTPGroup>
                </InputOTP>
                {error && 
                    <p className='shad-error text-14-regular mt-4 flex justify-center'>
                        {error}                    
                    </p>                
                }
                </div>
                <AlertDialogFooter>                   
                    <AlertDialogAction 
                        onClick={(e) => validatePasskey(e as React.MouseEvent<HTMLButtonElement, MouseEvent>)}
                        className='shad-primary-btn mx-auto w-full'
                    >
                        Enter admin panel
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default PasskeyModal
