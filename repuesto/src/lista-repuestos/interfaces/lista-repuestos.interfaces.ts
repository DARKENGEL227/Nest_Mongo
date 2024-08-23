import { Document } from 'mongoose';

export interface Repuesto extends Document {
    readonly codigo: string;
    readonly name: string;
    readonly marca: string;
    readonly categoria: string;
    readonly description: string;
    readonly price: number;
    readonly imageURL: string;
} 