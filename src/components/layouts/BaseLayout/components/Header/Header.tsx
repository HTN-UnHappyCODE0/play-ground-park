import React, {useContext, useEffect, useState} from 'react';
import {ArrowDown2} from 'iconsax-react';
import TippyHeadless from '@tippyjs/react/headless';

import {PropsHeader} from './interfaces';
import styles from './Header.module.scss';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import Navbar from '../Navbar';
import {useSelector} from 'react-redux';
import {RootState, store} from '~/redux/store';
import MenuProfile from '../MenuProfile';
import {TContextBaseLayout} from '../../interfaces';
import {ContextBaseLayout} from '../../BaseLayout';

function Header({title, breadcrumb}: PropsHeader) {
	const router = useRouter();

	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [openProfile, setOpenProfile] = useState<boolean>(false);

	const context = useContext<TContextBaseLayout>(ContextBaseLayout);

	const {infoUser} = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (openMenu) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'overlay';
		}
	}, [openMenu]);

	useEffect(() => {
		if (openMenu) {
			setOpenMenu(false);
			3;
		}
	}, [router]);

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().catch((err) => {
				console.error(`Lỗi mở toàn màn hình: ${err.message}`);
			});
		} else {
			document.exitFullscreen();
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.control}>
				<div className={styles.hamburger_icon}>
					<Image
						alt='icon hamburger'
						src={icons.hamburger}
						width={20}
						height={20}
						className={styles.hamburger}
						onClick={() => context?.setShowFull!(!context?.showFull)}
					/>
				</div>
				<div className={styles.hamburger_icon_mobile}>
					<Image
						alt='icon hamburger'
						src={icons.hamburger}
						width={20}
						height={20}
						className={styles.hamburger}
						onClick={() => setOpenMenu(true)}
					/>
				</div>
				{breadcrumb ? breadcrumb : <h4>{title}</h4>}
			</div>
			<div className={styles.main_info}>
				<div className={styles.full_screen} onClick={toggleFullScreen}>
					<Image src={icons.full_screen} alt='icon full screen' width={24} height={24} />
				</div>
				<div className={styles.box_noti}>
					<Image src={icons.bell} alt='icon bell' width={24} height={24} />
					{/* <div className={styles.box_count}>
						<span>1</span>
					</div> */}
				</div>
				<TippyHeadless
					maxWidth={'100%'}
					interactive
					visible={openProfile}
					onClickOutside={() => setOpenProfile(false)}
					placement='bottom-end'
					render={(attrs: any) => <MenuProfile onClose={() => setOpenProfile(false)} />}
				>
					<div className={styles.info} onClick={() => setOpenProfile(!openProfile)}>
						<div className={styles.box_avatar}>
							<Image
								className={styles.avatar_image}
								src={infoUser?.avatar ? `${process.env.NEXT_PUBLIC_IMAGE}/${infoUser?.avatar}` : icons.avatar}
								alt='avatar default'
								width={40}
								height={40}
							/>
						</div>
						<div>
							<p className={styles.name}>{infoUser?.fullname || 'Hoàng Tuấn nam'}</p>
						</div>
						<div className={clsx(styles.arrow, {[styles.active]: openProfile})}>
							<ArrowDown2 size={16} color='#171832' />
						</div>
					</div>
				</TippyHeadless>
			</div>

			{/* Responsive filter */}

			{/* Responsive mobile */}
			<div className={clsx(styles.overlay, {[styles.close]: !openMenu})} onClick={() => setOpenMenu(false)}></div>
			<div className={clsx(styles.main_mobile, {[styles.active]: openMenu})}>
				<Navbar />
			</div>
		</div>
	);
}

export default Header;
