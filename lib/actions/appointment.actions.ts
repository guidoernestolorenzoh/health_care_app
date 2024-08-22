'use server'
import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

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