import axiosClient from '.';
import {getKeyCert} from '~/common/funcs/optionConvert';

const uploadImageServices = {
	uploadSingleImage: (file: any, type: string) => {
		const dataFile = new FormData();

		dataFile.append('Time', getKeyCert().time);
		dataFile.append('KeyCert', getKeyCert().keyCert);
		dataFile.append('FileType', type);
		dataFile.append(`FileData`, file);

		return axiosClient.post(`/File/upload-single`, dataFile, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'text/plain',
			},
		});
	},
};
export default uploadImageServices;
