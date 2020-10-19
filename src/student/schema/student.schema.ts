import * as mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	mathematics_score: {
		type: Number,
		required: true
	},
	english_score: {
		type: Number,
		required: true
	},
	economics_score: {
		type: Number,
		required: true
	},
	biology_score: {
		type: Number,
		required: true
	},
	yoruba_score: {
		type: Number,
		required: true
	},
	mode: {
		type: Array,
		required: true
	},
	median: {
		type: Number,
		required: true
	},
	mean: {
		type: Number,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});