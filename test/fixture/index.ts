import * as moment from "moment";
import * as mongoose from "mongoose";
import { StudentSchema } from "../../src/student/schema/student.schema";

export const test: any = {};

// MODELS
const StudentExam = mongoose.model("Student", StudentSchema);

//DATA
test.createStudentExamData = {
	first_name: "Temitope",
	last_name: "Bamidele",
	mathematics_score: 14,
	english_score: 40,
	economics_score: 60,
	biology_score: 309,
	yoruba_score: 309,
	mode: [ 309 ],
	mean: 146.4,
	median: 146.4,
	created_at: moment().format("YYYY-M-DD HH:mm:ss"),
};

test.createStudentExam = () => {
	return StudentExam.create(test.createStudentExamData)
		.then(returnStudentExam => {
			return returnStudentExam;
		})
		.catch(error => {
			return error;
		});
};