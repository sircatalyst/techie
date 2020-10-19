import {
	Controller,
	UsePipes,
	ValidationPipe,
	Get,
	Param,
	Body,
	Post
} from "@nestjs/common";
import { StudentService } from "./student.service";
import {
	CreateStudentDTO,
	FindOneDTO
} from "./dto/student";

@Controller("students")
@UsePipes(new ValidationPipe())
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Post()
	async createUser(
		@Body() createStudentPayload: CreateStudentDTO
	): Promise<any> {;
		const data = await this.studentService.createStudent(
			createStudentPayload
		);
		return { data };
	}

	@Get(":id")
	async getOneStudent(
		@Param() id: FindOneDTO
	): Promise<any> {
		const data = await this.studentService.findOneStudent(id);
		return { data };
	}

	@Get()
	async getAllStudents(): Promise<any> {
		const data = await this.studentService.findAllStudents();
		return { data };
	}
}
