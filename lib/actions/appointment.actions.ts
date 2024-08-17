'use server'
import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

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
        console.log(appointment);
        return parseStringify(appointment);
    } catch (error: any) {
        throw error;
    }
};