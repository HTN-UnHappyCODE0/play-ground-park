import Button from '~/components/common/Button';
import styles from './MainUpdateProfile.module.scss';
import {IFormUpdateProfile, PropsMainUpdateProfile} from './interfaces';
import {Fragment, memo, useEffect, useState} from 'react';
import {PATH} from '~/constants/config';
import UploadAvatar from '~/components/utils/UploadAvatar';
import icons from '~/constants/images/icons';
import FormCustom, {ContextFormCustom, InputForm, SelectForm} from '~/components/common/FormCustom';
import GridColumn from '~/components/layouts/GridColumn';
import {QUERY_KEY, TYPE_GENDER} from '~/constants/config/enum';
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import provinceServices from '~/services/provinceServices';
import {useRouter} from 'next/router';
import {toastWarn} from '~/common/funcs/toast';
import uploadImageServices from '~/services/uploadServices';
import Loading from '~/components/common/Loading';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootState, store} from '~/redux/store';
import {setInfoUser} from '~/redux/reducer/user';

function MainUpdateProfile({}: PropsMainUpdateProfile) {
	const router = useRouter();

	const {infoUser} = useSelector((state: RootState) => state.user);
	const [file, setFile] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [form, setForm] = useState<IFormUpdateProfile>({
		linkAvatar: '',
		name: '',
		phoneNumber: '',
		email: '',
		provinceId: '',
		districtId: '',
		townId: '',
		address: '',
		dob: '',
		gender: TYPE_GENDER.MALE,
	});

	const {data, isSuccess} = useQuery({
		queryKey: [QUERY_KEY.profile_user],
		queryFn: () =>
			httpRequest({
				http: userServices.profileUser({}),
			}),

		select(data) {
			return data;
		},
	});

	useEffect(() => {
		if (isSuccess && data) {
			setForm({
				linkAvatar: data?.profileImage || '',
				name: data?.name || '',
				email: data?.email || '',
				phoneNumber: data?.phoneNumber || '',
				provinceId: data?.provinceId || '',
				districtId: data?.districtId || '',
				townId: data?.townId || '',
				address: data?.address || '',
				dob: moment(data?.dob).format('YYYY-MM-DD') || '',
				gender: data?.gender,
			});
		}
	}, [isSuccess, data]);

	const {data: listProvince = []} = useQuery<
		{
			matp: string;
			name: string;
		}[]
	>({
		queryKey: [QUERY_KEY.dropdown_province],
		queryFn: () =>
			httpRequest({
				http: provinceServices.listProvince({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: listDistrict = []} = useQuery<
		{
			maqh: string;
			name: string;
		}[]
	>({
		queryKey: [QUERY_KEY.dropdown_district, form.provinceId],
		queryFn: () =>
			httpRequest({
				http: provinceServices.listDistrict({
					keyword: '',
					idParent: form.provinceId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.provinceId,
	});

	const {data: listTown = []} = useQuery<
		{
			xaid: string;
			name: string;
		}[]
	>({
		queryKey: [QUERY_KEY.dropdown_town, form.districtId],
		queryFn: () =>
			httpRequest({
				http: provinceServices.listTown({
					keyword: '',
					idParent: form.districtId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.districtId,
	});

	const funcUpdateProfile = useMutation({
		mutationFn: (body: {path: string}) => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa thông tin thành công!',
				http: userServices.updateProfile({
					address: form?.address,
					email: form?.email,
					gender: form?.gender,
					name: form?.name,
					phoneNumber: form?.phoneNumber,
					identityNumber: '',
					profileImage: body?.path ? body?.path : form?.linkAvatar,
					dob: form?.dob,
				}),
			});
		},
		onSuccess(data, variable) {
			if (data) {
				setForm({
					linkAvatar: '',
					name: '',
					phoneNumber: '',
					email: '',
					provinceId: '',
					districtId: '',
					townId: '',
					address: '',
					dob: '',
					gender: TYPE_GENDER.MALE,
				});
				store.dispatch(
					setInfoUser({
						accessExpiresAt: infoUser?.accessExpiresAt!,
						accessToken: infoUser?.accessToken!,
						avatar: variable?.path ? variable?.path : form?.linkAvatar!,
						fullname: form?.name,
						refreshExpiresAt: infoUser?.refreshExpiresAt!,
						refreshToken: infoUser?.refreshToken!,
					})
				);
				router.back();
			}
		},
	});

	const handleSubmit = async () => {
		if (form.dob && new Date(form.dob).getTime() >= new Date(new Date().toDateString()).getTime()) {
			return toastWarn({
				msg: 'Ngày sinh phải nhỏ hơn ngày hiện tại!',
			});
		}

		if (!!file) {
			const dataImage = await httpRequest({
				setLoading,
				http: uploadImageServices.uploadSingleImage(file, '1'),
			});

			return funcUpdateProfile.mutate({
				path: dataImage,
			});
		} else {
			return funcUpdateProfile.mutate({
				path: '',
			});
		}
	};

	return (
		<Fragment>
			<Loading loading={funcUpdateProfile.isPending || loading} />
			<FormCustom form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.container}>
					<div className={styles.header}>
						<h2>Chỉnh sửa thông tin tài khoản</h2>
						<div className={styles.groups_btn}>
							<Button rounded_50 p_10_40 greyBlue href={PATH.Profile}>
								Hủy bỏ
							</Button>
							<ContextFormCustom.Consumer>
								{({isDone}) => (
									<Button p_10_40 midnightBlue rounded_50 disable={!isDone}>
										Cập nhật
									</Button>
								)}
							</ContextFormCustom.Consumer>
						</div>
					</div>
					<div className={styles.main}>
						<UploadAvatar
							path={form?.linkAvatar ? `${process.env.NEXT_PUBLIC_IMAGE}${form?.linkAvatar}` : icons.avatar}
							name='avatar'
							onSetFile={setFile}
							resetPath={() =>
								setForm((prev) => ({
									...prev,
									linkAvatar: '',
								}))
							}
						/>
						<div className={styles.mt}>
							<GridColumn col_2>
								<InputForm
									placeholder='Nhập họ và tên '
									name='name'
									type='text'
									value={form.name}
									max={255}
									label={<span>Họ và tên</span>}
								/>
								<InputForm
									placeholder='Nhập số điện thoại '
									name='phoneNumber'
									type='text'
									value={form.phoneNumber}
									max={255}
									label={<span>Số điện thoại</span>}
								/>
								<div>
									<InputForm
										placeholder='Nhập email '
										name='email'
										type='text'
										value={form.email}
										max={255}
										label={<span>Email</span>}
									/>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<SelectForm
									placeholder='Lựa chọn'
									label={<span>Tỉnh/Thành phố</span>}
									onClean={() =>
										setForm((prev) => ({
											...prev,
											provinceId: '',
											districtId: '',
											townId: '',
										}))
									}
									value={form.provinceId}
									options={listProvince || []}
									getOptionLabel={(opt) => opt.name}
									getOptionValue={(opt) => opt.matp}
									onSelect={(data) => {
										setForm((prev) => ({
											...prev,
											provinceId: data.matp,
											districtId: '',
											townId: '',
										}));
									}}
								/>
								<div>
									<SelectForm
										placeholder='Lựa chọn'
										label={<span>Quận/Huyện</span>}
										onClean={() =>
											setForm((prev) => ({
												...prev,
												districtId: '',
												townId: '',
											}))
										}
										value={form.districtId}
										options={listDistrict || []}
										getOptionLabel={(opt) => opt.name}
										getOptionValue={(opt) => opt.maqh}
										onSelect={(data) => {
											setForm((prev) => ({
												...prev,
												districtId: data.maqh,
												townId: '',
											}));
										}}
									/>
								</div>
								<SelectForm
									placeholder='Lựa chọn'
									label={<span>Xã/Thị trấn</span>}
									onClean={() =>
										setForm((prev) => ({
											...prev,
											townId: '',
										}))
									}
									value={form.townId}
									options={listTown || []}
									getOptionLabel={(opt) => opt.name}
									getOptionValue={(opt) => opt.xaid}
									onSelect={(data) => {
										setForm((prev) => ({
											...prev,
											townId: data?.xaid,
										}));
									}}
								/>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<InputForm label='Địa chỉ' placeholder='Nhập địa chỉ' name='address' type='text' />
						</div>
						<div className={styles.mt}>
							<GridColumn col_2>
								<InputForm
									type='date'
									name='dob'
									isBlur={true}
									// value={form?.dob}
									label={<span>Ngày sinh</span>}
									placeholder='Nhập ngày sinh'
								/>
								<div className={styles.type}>
									<p className={styles.label}>
										Giới tính <span style={{color: 'red'}}>*</span>
									</p>
									<div className={styles.group_radio}>
										<div className={styles.item_radio}>
											<input
												id='gender_male'
												className={styles.input_radio}
												type='radio'
												name='gender'
												value={form.gender}
												checked={form.gender == 0}
												onChange={() =>
													setForm((prev) => ({
														...prev,
														gender: 0,
													}))
												}
											/>
											<label className={styles.input_lable} htmlFor='gender_male'>
												Nam
											</label>
										</div>
										<div className={styles.item_radio}>
											<input
												id='gender_female'
												className={styles.input_radio}
												type='radio'
												name='gender'
												value={form.gender}
												checked={form.gender == 1}
												onChange={() =>
													setForm((prev) => ({
														...prev,
														gender: 1,
													}))
												}
											/>
											<label className={styles.input_lable} htmlFor='gender_female'>
												Nữ
											</label>
										</div>
									</div>
								</div>
							</GridColumn>
						</div>
					</div>
				</div>
			</FormCustom>
		</Fragment>
	);
}

export default memo(MainUpdateProfile);
