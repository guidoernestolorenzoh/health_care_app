'use client'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const PassKeyModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const closeDialog = () => {
        setOpen(false);
        router.push('/');
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='shad-alert-dialog'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between'>
                        Verify OTP
                        <Image src='/assets/icons/close.svg' alt='close' className='cursor-pointer' width={20} height={20} onClick={() => closeDialog()} />
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-xs'>
                        Please enter the OTP sent to your registered mobile number.
                    </AlertDialogDescription>
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* <Button variant='outline' className='shad-primary-btn'>
                        Verify
                    </Button> */}
                    <AlertDialogAction className='shad-primary-btn mx-auto w-full'>Verify</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default PassKeyModal
