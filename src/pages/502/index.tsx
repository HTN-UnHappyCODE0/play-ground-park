import Head from 'next/head';
import React, {Fragment} from 'react';

import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';

import styles from './Page502.module.scss';
import Image from 'next/image';
import background from '~/constants/images/background';

function PageError() {
	return (
		<Fragment>
			<Head>
				<title>Page 502</title>
				<meta name='description' content='Page 502' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className={styles.container}>
				<div>
					<Image src={background.image502} className={styles.image} alt='background-502' />
				</div>
				<h4 className={styles.title}>Oops! Lỗi máy chủ nội bộ..</h4>
				<p className={styles.text}>Xin lỗi! Hiện tại máy chủ đang gặp sự cố. Bạn vui lòng chờ trong giây lát hoặc thử lại sau.</p>
				<div className={styles.btn}>
					<Button href={PATH.Home} midnightBlue rounded_50 p_10_24 bold>
						Quay về trang chủ
					</Button>
				</div>
			</div>
		</Fragment>
	);
}

export default PageError;
