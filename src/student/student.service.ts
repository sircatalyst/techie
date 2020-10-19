import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Student } from "./interface/student.interface";
import { mean, median, mode } from "../utils/calcStatistics";
import {
	CreateStudentDTO,
	FindOneDTO
} from "./dto/student";


@Injectable()
export class StudentService {
	constructor(@InjectModel("Student") private studentModel: Model<Student>) {}

	/**
	 * @desc creates a student
	 * @param object
	 * @returns newly created student {}
	 */
	async createStudent(
		createStudentPayload: CreateStudentDTO
	): Promise<Student> {
		const { first_name, last_name } = createStudentPayload;
		delete createStudentPayload.first_name;
		delete createStudentPayload.last_name;
		const name = await this.studentModel.findOne({ first_name, last_name });
		if (name) {
			throw new HttpException(
				"Student already exists",
				HttpStatus.BAD_REQUEST
			);
		};
		createStudentPayload.mean = mean(createStudentPayload);
		createStudentPayload.mode = mode(createStudentPayload);
		createStudentPayload.median = median(createStudentPayload);
		createStudentPayload.first_name = first_name;
		createStudentPayload.last_name = last_name;
		
		const createStudent = new this.studentModel(createStudentPayload);
		const createdStudent = await createStudent.save();
		return createdStudent;
	}

	/**
	 * @desc finds a user
	 * @returns found user
	 */
	async findOneStudent(param: FindOneDTO): Promise<Student> {
		try {
			const { id } = param;
			const student = await this.studentModel.findOne({
				_id: id
			});
			if (!student) {
				throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
			}
			return student;
		} catch (error) {
			throw new HttpException(
				error.message,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * @desc finds students
	 * @returns found students
	 */
	async findAllStudents(): Promise<any> {
		const students = await this.studentModel.find();
		return students;
	}
}
