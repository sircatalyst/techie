import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import * as mongoose from "mongoose";
import { appConfig } from "../src/config";
import { AppModule } from "../src/app.module";
import { CreateStudentDTO } from "../src/student/dto/student";
import { test } from "./fixture/index";


let app: INestApplication;
beforeAll(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule]
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();
	await mongoose.connect(appConfig.db);
	await mongoose.connection.dropDatabase();
});

afterAll(async done => {
	await mongoose.connect(appConfig.db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	await mongoose.connection.dropDatabase();
	await mongoose.disconnect();
	await app.close();
	done();
});

const createStudentData: CreateStudentDTO = {
	first_name: "Temitope",
	last_name: "Bamidele",
	mathematics_score: 14,
	english_score: 40,
	economics_score: 60,
	biology_score: 309,
	yoruba_score: 309
};

describe("POST, create Student exam", () => {
	afterAll(async () => {
		await mongoose.connection.dropCollection("students", (err: any) => {
			if (err) {
				return err;
			}
		});
	});

	it("Should fail if no data is submitted", () => {
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send()
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toEqual(9);
				expect(body.message[0]).toEqual("first_name should not be empty");
				expect(body.message[1]).toEqual("first_name must be longer than or equal to 2 characters");
				expect(body.message[2]).toEqual("last_name should not be empty");
				expect(body.message[3]).toEqual("last_name must be longer than or equal to 2 characters");
				expect(body.message[4]).toEqual("mathematics_score should not be empty");
				expect(body.message[5]).toEqual("english_score should not be empty");
				expect(body.message[6]).toEqual("economics_score should not be empty");
				expect(body.message[7]).toEqual("biology_score should not be empty");
				expect(body.message[8]).toEqual("yoruba_score should not be empty");
				expect(body.message.length).toEqual(9);
				expect(body.error).toEqual("Bad Request");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should fail if first_name is not submitted", () => {
		const data = { ...createStudentData };
		delete data.first_name;
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(data)
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toEqual(2);
				expect(body.message[0]).toEqual("first_name should not be empty");
				expect(body.message[1]).toEqual("first_name must be longer than or equal to 2 characters");
				expect(body.error).toEqual("Bad Request");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should fail if last_name is not submitted", () => {
		const data = { ...createStudentData };
		delete data.last_name;
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(data)
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toEqual(2);
				expect(body.message[0]).toEqual("last_name should not be empty");
				expect(body.message[1]).toEqual("last_name must be longer than or equal to 2 characters");
				expect(body.error).toEqual("Bad Request");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should fail if mathematics_score is not submitted", () => {
		const data = { ...createStudentData };
		delete data.mathematics_score;
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(data)
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toEqual(1);
				expect(body.message[0]).toEqual("mathematics_score should not be empty");
				expect(body.error).toEqual("Bad Request");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should fail if english_score is not submitted", () => {
		const data = { ...createStudentData };
		delete data.english_score;
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(data)
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toEqual(1);
				expect(body.message[0]).toEqual("english_score should not be empty");
				expect(body.error).toEqual("Bad Request");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should fail if economics_score is not submitted", () => {
		const data = { ...createStudentData };
		delete data.economics_score;
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(data)
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toEqual(1);
				expect(body.message[0]).toEqual("economics_score should not be empty");
				expect(body.error).toEqual("Bad Request");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should fail if biology_score is not submitted", () => {
		const data = { ...createStudentData };
		delete data.biology_score;
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(data)
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toEqual(1);
				expect(body.message[0]).toEqual("biology_score should not be empty");
				expect(body.error).toEqual("Bad Request");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should fail if yoruba_score is not submitted", () => {
		const data = { ...createStudentData };
		delete data.yoruba_score;
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(data)
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toEqual(1);
				expect(body.message[0]).toEqual("yoruba_score should not be empty");
				expect(body.error).toEqual("Bad Request");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should pass if all data are valid", async () => {
		const data = { ...createStudentData };
		return request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(data)
			.expect(({ body }) => {
				expect(body.data._id).toBeDefined();
				expect(body.data.mathematics_score).toEqual(createStudentData.mathematics_score);
				expect(body.data.english_score).toEqual(createStudentData.english_score);
				expect(body.data.economics_score).toEqual(createStudentData.economics_score);
				expect(body.data.biology_score).toEqual(createStudentData.biology_score);
				expect(body.data.yoruba_score).toEqual(createStudentData.yoruba_score);
				expect(body.data.first_name).toEqual(createStudentData.first_name);
				expect(body.data.last_name).toEqual(createStudentData.last_name);
				expect(body.data.created).toBeDefined();
				expect(body.data.mode.length).toBeGreaterThan(0);
				expect(body.data.mean).toBeDefined();
				expect(body.data.median).toBeDefined();
			})
			.expect(HttpStatus.CREATED);
	});



});

describe("LIST, list all Students' exams", () => {
	beforeAll(async () => {
		await request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(createStudentData)
			.expect(HttpStatus.CREATED);
	});

	afterAll(async () => {
		await mongoose.connection.dropCollection("students", (err: any) => {
			if (err) {
				return err;
			}
		});
	});

	it("Should get list of all students' exams", () => {
		return request(app.getHttpServer())
			.get("/students")
			.set("Accept", "application/json")
			.expect(({ body }) => {
				expect(body.data.length).toBeGreaterThan(0);
			})
			.expect(HttpStatus.OK);
	});
});

describe("GET, get a single Student's exams", () => {
	beforeAll(async () => {
		await request(app.getHttpServer())
			.post("/students")
			.set("Accept", "application/json")
			.send(createStudentData)
			.expect(HttpStatus.CREATED);
	});

	afterAll(async () => {
		await mongoose.connection.dropCollection("students", (err: any) => {
			if (err) {
				return err;
			}
		});
	});

	it("Should fail if ID is invalid", async () => {
		return request(app.getHttpServer())
			.get("/students/5f8e01a15b63113404b372f2s")
			.set("Accept", "application/json")
			.expect(({ body }) => {
				expect(body.statusCode).toEqual(400);
				expect(body.message.length).toBeGreaterThan(0);
				expect(body.message[0]).toEqual("id must be a mongodb id");
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it("Should get a student's exam successfully if ID is valid", async () => {
		const data = { ...createStudentData };
		const studentExam = await test.createStudentExam(data);
		return request(app.getHttpServer())
			.get(`/students/${studentExam._id}`)
			.set("Accept", "application/json")
			.expect(({ body }) => {
				expect(body.data.first_name).toEqual(studentExam.first_name);
				expect(body.data.last_name).toEqual(studentExam.last_name);
				expect(body.data.phone).toEqual(studentExam.phone);
				expect(body.data.email).toEqual(studentExam.email);
				expect(body.data.mathematics_score).toEqual(studentExam.mathematics_score);
				expect(body.data.english_score).toEqual(studentExam.english_score);
				expect(body.data.economics_score).toEqual(studentExam.economics_score);
				expect(body.data.biology_score).toEqual(studentExam.biology_score);
				expect(body.data.yoruba_score).toEqual(studentExam.yoruba_score);
				expect(body.data.mean).toEqual(studentExam.mean);
				expect(body.data.median).toEqual(studentExam.median);
				expect(body.data.mode).toBeDefined();
			})
			.expect(HttpStatus.OK);
	});
});
