import * as mongoose from "mongoose";

export interface Student extends mongoose.Document {
	id?: string;
	first_name: string;
	last_name: string;
	mathematics_score: number;
	english_score: number;
	economics_score: number;
	biology_score: number;
	yoruba_score: number;
	mode: any;
	mean: number;
	median: number;
	created: Date;
}
