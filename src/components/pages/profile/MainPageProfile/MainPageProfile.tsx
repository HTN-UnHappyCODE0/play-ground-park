import Button from '~/components/common/Button';
import styles from './MainPageProfile.module.scss';
import {IProfile, PropsMainPageProfile} from './interfaces';
import {memo, use} from 'react';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {Cake, Call, Location, Personalcard, Sms, TagUser, UserOctagon, UserSquare} from 'iconsax-react';
import GridColumn from '~/components/layouts/GridColumn';
import {useRouter} from 'next/router';
import Popup from '~/components/common/Popup';
import FormChangePassword from '../FormChangePassword';
import {PATH} from '~/constants/config';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, TYPE_GENDER} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import {getTextAddress} from '~/common/funcs/optionConvert';
import Moment from 'react-moment';
import userServices from '~/services/userServices';

function MainPageProfile({}: PropsMainPageProfile) {
	const router = useRouter();
	const {_action} = router.query;

	const {data: profileUser} = useQuery<IProfile>({
		queryKey: [QUERY_KEY.profile_user],
		queryFn: () =>
			httpRequest({
				http: userServices.profileUser({}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h2>Thông tin tài khoản</h2>
				<div className={styles.group_btn}>
					<Button
						green
						p_10_24
						rounded_50
						onClick={() =>
							router.replace({
								pathname: router.pathname,
								query: {...router.query, _action: 'change-password'},
							})
						}
					>
						Đổi mật khẩu
					</Button>
					<Button midnightBlue p_10_24 rounded_50 href={PATH.UpdateProfile}>
						Chỉnh sửa
					</Button>
				</div>
			</div>
			<div className={styles.box_info}>
				<Image
					src={profileUser?.profileImage ? `${process.env.NEXT_PUBLIC_IMAGE}${profileUser?.profileImage}` : icons.avatar}
					alt='avatar default'
					width={120}
					height={120}
					style={{borderRadius: '8px'}}
				/>
			</div>
			<div className={styles.main}>
				<div className={styles.main_table}>
					<div className={styles.main_title}>Thông tin cơ bản</div>
					<div className={styles.content_table}>
						<div className={styles.item_table}>
							<p>
								<TagUser fontSize={24} fontWeight={600} />
								Họ và tên
							</p>
							<span>{profileUser?.name || '---'}</span>
						</div>
						<div className={styles.item_table}>
							<p>
								<Cake fontSize={24} fontWeight={600} />
								Ngày sinh
							</p>
							<span>{profileUser?.dob ? <Moment date={profileUser?.dob || '---'} format='DD/MM/YYYY' /> : '---'}</span>
						</div>
						<div className={styles.item_table}>
							<p>
								<UserOctagon fontSize={24} fontWeight={600} />
								Giới tính
							</p>
							<span>
								{profileUser?.gender == TYPE_GENDER.MALE && 'Nam'}
								{profileUser?.gender == TYPE_GENDER.FEMALE && 'Nữ'}
								{profileUser?.gender == TYPE_GENDER.OTHER && 'Khác'}
							</span>
						</div>
					</div>
				</div>
				<div className={styles.main_table}>
					<div className={styles.main_title}>Liên hệ</div>
					<div className={styles.content_table}>
						<div className={styles.item_table}>
							<p>
								<Sms fontSize={24} fontWeight={600} />
								Email
							</p>
							<span>{profileUser?.email || '---'}</span>
						</div>
						<div className={styles.item_table}>
							<p>
								<Call fontSize={24} fontWeight={600} />
								Số điện thoại
							</p>
							<span>{profileUser?.phoneNumber || '---'}</span>
						</div>
						<div className={styles.item_table}>
							<p>
								<Location fontSize={24} fontWeight={600} />
								Địa chỉ
							</p>
							<span>{profileUser?.address || '---'}</span>
						</div>
					</div>
				</div>
			</div>
			<Popup
				open={_action == 'change-password'}
				onClose={() => {
					const {_action, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: rest,
					});
				}}
			>
				<FormChangePassword
					onClose={() => {
						const {_action, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: rest,
						});
					}}
				/>
			</Popup>
		</div>
	);
}

export default memo(MainPageProfile);
