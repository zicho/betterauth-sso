export type DbResult<T> = {
	data: T | null;
	success: boolean;
	message?: string;
};

export class DbHelper {
	static success<T>(data: T): DbResult<T> {
		return {
			data: data,
			success: true
		};
	}

	static failed<T>(error?: unknown): DbResult<T> {
		const errorMessage =
			typeof error === 'string'
				? error
				: error &&
					  typeof error === 'object' &&
					  'message' in error
					? (error as { message: string }).message
					: 'Unknown error';

		return {
			data: null,
			success: false,
			message: errorMessage
		};
	}
}
