'use server'
import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, messaging, PROJECT_ID } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment 
        );

        return parseStringify(newAppointment);
    } catch (error: any) {
        
    } 
};

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,            
        );        
        return parseStringify(appointment);
    } catch (error: any) {
        throw error;
    }
};

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const inicialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0
        };
        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            switch (appointment.status) {
                case 'scheduled':
                    acc.scheduledCount+=1;
                    break;
                case 'pending':
                    acc.pendingCount+=1;
                    break;
                case 'cancelled':
                    acc.cancelledCount+=1;
                    break;
                default:
                    break;
            }
            return acc;
        }, inicialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        };
        return parseStringify(data);
    } catch (error: any) {
        throw error;
    }
};  

export const sendSMSNotification = async (userId: string, content: string) => {
    try {
        const message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId],
        );
        return parseStringify(message);
    } catch (error: any) {
        throw error;
    }
};

export const updateAppointment = async ({
    appointmentId, 
    userId, 
    timeZone,
    appointment, 
    type
}: UpdateAppointmentParams) => {    
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        );
        if (!updatedAppointment) {
            throw new Error('Appointment not found');
        }
       
        const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;

         await sendSMSNotification(userId, smsMessage);

        revalidatePath('/admin');
        return parseStringify(updatedAppointment);
    } catch (error: any) {
        throw error;
    }
};


