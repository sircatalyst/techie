import "dotenv/config";

export const appConfig: any = {};

/**
 * @desc variables to user for production
 */
if (process.env.NODE_ENV === "production") {
	appConfig.version = process.env.APP_VERSION || "v1";
	appConfig.name = process.env.PROJECT_NAME || "techie";
	appConfig.port = process.env.PORT || 3000;
	appConfig.environment = process.env.NODE_ENV || "production";
	appConfig.db = process.env.MONGO_URI_PRODUCTION;
}

/**
 * @desc variables to user for development environment
 */
if (process.env.NODE_ENV === "development") {
	appConfig.version = process.env.APP_VERSION || "v1";
	appConfig.name = process.env.PROJECT_NAME || "techie",
	appConfig.port = parseInt(process.env.PORT, 10) || 3001,
	appConfig.environment = process.env.NODE_ENV || "development";
	appConfig.db = process.env.MONGO_URI
}

/**
 * @desc variables to user for test environment
 */

if (
	process.env.NODE_ENV !== "production" &&
	process.env.NODE_ENV !== "development"
) {
	appConfig.version = process.env.APP_VERSION || "v1";
	appConfig.name = process.env.PROJECT_NAME || "techie";
	appConfig.port = parseInt(process.env.PORT_TEST, 10) || 9000
	appConfig.environment = process.env.NODE_ENV || "test";
	appConfig.db =
			process.env.MONGO_URI_TEST ||
			`mongodb://localhost/${process.env.PROJECT_NAME}_test`;
}
export const swaggerConfig = {
	title: process.env.PROJECT_NAME || "techie",
	description:
		process.env.SWAGGER_DESCRIPTION || "An api endpoint documentation",
	version: process.env.PROJECT_VERSION || "1.0",
	swaggerBaseUrl: process.env.SWAGGER_BASE_URL || "api-docs"
};
