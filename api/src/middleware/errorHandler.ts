import { Response, Request, NextFunction } from "express";

const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	const statusCode = res.statusCode ? res.statusCode : 500;
	switch (statusCode) {
		case 400:
			res.json({
				title: "Validation Failed",
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		case 404:
			res.json({
				title: "Not found",
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		case 401:
			res.json({
				title: "Unauthorized",
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		case 403:
			res.json({
				title: "Forbidden",
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		case 500:
			res.json({
				title: "Internal Server Error",
				message: err.message,
				stackTrace: err.stack,
			});
		default:
			console.log("No ERRORS, All good!!");
			break;
	}
};
export default errorHandler;
