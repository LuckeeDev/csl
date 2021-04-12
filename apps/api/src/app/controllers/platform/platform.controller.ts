import { saveError } from '@/common/logs';
import { Platform } from '@/models';
import { IHttpRes, PlatformStatus } from '@csl/shared';

export const createPlatformStatus = async (
	status: PlatformStatus
): Promise<IHttpRes<PlatformStatus>> => {
	try {
		const start = new Date(status.status.start);
		const end = new Date(status.status.end);

		const savedStatus = await new Platform({
			id: status.id,
			status: { start, end },
		}).save();

		return {
			success: true,
			data: savedStatus,
		};
	} catch (err) {
		saveError('Error while creating a new platform status entry', {
			err,
			category: 'server',
		});

		return {
			success: false,
			err,
		};
	}
};

export const updatePlatformStatus = async (
	id: PlatformStatus['id'],
	status: PlatformStatus['status']
): Promise<IHttpRes<PlatformStatus>> => {
	try {
		const start = new Date(status.start);
		const end = new Date(status.end);

		const updatedStatus = await Platform.findOneAndUpdate(
			{ id },
			{ status: { start, end } },
			{ new: true }
		);

		return {
			success: true,
			data: updatedStatus,
		};
	} catch (err) {
		saveError(`Error while updating the platform status entry with ID ${id}`, {
			category: 'server',
			err,
		});

		return {
			success: false,
			err,
		};
	}
};
