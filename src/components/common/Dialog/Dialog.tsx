import React from 'react';

import {PropsDialog} from './interfaces';
import styles from './Dialog.module.scss';
import Popup from '../Popup';
import Button from '../Button';
import IconRound from '~/components/utils/IconRound';

function Dialog({open, title, note, titleCancel = 'Hủy bỏ', titleSubmit = 'Xác nhận', onClose, onSubmit, type = 'success'}: PropsDialog) {
	return (
		<Popup open={open} onClose={onClose}>
			<div className={styles.container}>
				<IconRound type={`${type}`} />
				<h4 className={styles.title}>{title}</h4>
				<p className={styles.note}>{note}</p>
				<div className={styles.groupBtn}>
					<Button grey_2 rounded_50 bold onClick={onClose} grey>
						{titleCancel}
					</Button>
					<Button bold rounded_50 onClick={onSubmit} midnightBlue>
						{titleSubmit}
					</Button>
				</div>

				{/* <div className={styles.close} onClick={onClose}>
					<IoClose size={28} color='#8492A6' />
				</div> */}
			</div>
		</Popup>
	);
}

export default Dialog;
