import {
	MinLength,
	IsNotEmpty,
	IsHexadecimal,
	IsMongoId,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDTO {
	@MinLength(2)
	@IsNotEmpty()
	@ApiProperty({ type: String, description: "first_name" })
	first_name: string;

	@MinLength(2)
	@IsNotEmpty()
	@ApiProperty({ type: String, description: "last_name" })
	last_name: string;

	@IsNotEmpty()
	@ApiProperty({ type: Number, description: "mathematics_score" })
	mathematics_score: number;

	@IsNotEmpty()
	@ApiProperty({ type: Number, description: "english_score" })
	english_score: number;

	@IsNotEmpty()
	@ApiProperty({ type: Number, description: "economics_score" })
	economics_score: number;

	@IsNotEmpty()
	@ApiProperty({ type: Number, description: "biology_score" })
	biology_score: number;

	@IsNotEmpty()
	@ApiProperty({ type: Number, description: "yoruba_score" })
	yoruba_score: number;

	mean?: number;
	mode?: any;
	median?: number;
}

export class FindOneDTO {
	@IsHexadecimal({ message: "id must be a valid mongo id" })
	@IsMongoId()
	@ApiProperty({ type: String, description: "id" })
	id: string;
}
