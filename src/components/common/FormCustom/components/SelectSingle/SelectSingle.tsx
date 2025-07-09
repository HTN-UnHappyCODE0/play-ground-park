import styles from './SelectSingle.module.scss';
import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {GrSearch} from 'react-icons/gr';
import {IoClose} from 'react-icons/io5';
import Image from 'next/image';

import {removeVietnameseTones} from '~/common/funcs/optionConvert';
import icons from '~/constants/images/icons';
import Popup from '~/components/common/Popup';
import Button from '~/components/common/Button';
import {PropsSelectSingle} from './interfaces';
import {SearchNormal} from 'iconsax-react';

function SelectSingle<OptionType>({
	text = '',
	label,
	placeholder = 'Chọn 1 giá trị',
	isSearch = true,
	readOnly,
	disabledItems = [],
	selectedItem,
	options,
	title,
	action,
	getOptionLabel,
	getOptionValue,
	setSelectedItem,
	onClickSelect,
	renderOption,
}: PropsSelectSingle<OptionType>) {
	const refInputSearch = useRef<HTMLInputElement>(null);

	const [keyword, setKeyword] = useState('');
	const [isFocus, setIsFocus] = useState(false);
	const [selectedTemp, setSelectedTemp] = useState<string | number | null>(null);

	useEffect(() => {
		if (isFocus && refInputSearch.current) {
			setTimeout(() => refInputSearch.current?.focus(), 0);
		}
	}, [isFocus]);

	useEffect(() => {
		if (isFocus) {
			setSelectedTemp(selectedItem ?? null);
		}
	}, [isFocus, selectedItem]);

	const handlerFocused = () => {
		if (onClickSelect) {
			onClickSelect();
		} else if (!readOnly) {
			setIsFocus(true);
		}
	};

	const handleSelect = (value: string | number) => {
		if (!disabledItems.includes(value)) {
			setSelectedTemp(value);
		}
	};

	const handleSave = () => {
		setSelectedItem?.(selectedTemp);
		setIsFocus(false);
	};

	const handleClose = () => {
		setIsFocus(false);
		setKeyword('');
		setSelectedTemp(selectedItem ?? null);
	};

	const selectedLabel = (() => {
		const selectedOption = options.find((opt) => getOptionValue(opt) === selectedItem);
		return selectedOption ? getOptionLabel(selectedOption) : `Đã chọn 1 ${text}`;
	})();

	const filteredOptions = options.filter((opt) => removeVietnameseTones(getOptionLabel(opt)).includes(removeVietnameseTones(keyword)));

	return (
		<div className={clsx(styles.container, {[styles.focus]: isFocus, [styles.readOnly]: readOnly})}>
			{label && <label className={styles.label}>{label}</label>}

			<div className={styles.main_select} onClick={handlerFocused}>
				<p className={clsx(styles.value, {[styles.placeholder]: !selectedItem})}>{selectedItem ? selectedLabel : placeholder}</p>
			</div>

			<Popup open={isFocus} onClose={handleClose}>
				<div className={styles.main_popup}>
					<div className={styles.head}>
						<h4 className={styles.title}>{title || 'Chọn 1 giá trị'}</h4>
						{isSearch && (
							<div className={clsx(styles.head_search)}>
								<div className={clsx(styles.search_group)}>
									<div className={styles.search_icon}>
										<SearchNormal color='#0011AB' size={20} />
									</div>
									<input
										ref={refInputSearch}
										type='text'
										value={keyword}
										placeholder='Tìm kiếm...'
										onChange={(e) => setKeyword(e.target.value)}
									/>
								</div>
								{action && <div className={styles.actions}>{action}</div>}
							</div>
						)}
					</div>

					{filteredOptions.length > 0 ? (
						<div className={styles.list_option}>
							{filteredOptions.map((opt) => {
								const value = getOptionValue(opt);
								return (
									<div key={value} className={styles.option}>
										<input
											type='radio'
											name='select_single'
											id={`radio-${value}`}
											className={styles.input_radio}
											checked={selectedTemp === value}
											onChange={() => handleSelect(value)}
											disabled={disabledItems.includes(value)}
										/>
										<label htmlFor={`radio-${value}`} className={styles.label_check_item}>
											{getOptionLabel(opt)}
											{renderOption ? renderOption(opt) : null}
										</label>
									</div>
								);
							})}
						</div>
					) : (
						<div className={styles.empty}>
							<Image src={icons.emptyFile} alt='empty' />
							<p>Danh sách lựa chọn rỗng!</p>
						</div>
					)}

					<div className={styles.control}>
						<div>
							{' '}
							<Button p_10_40 greyBlue rounded_50 onClick={handleClose}>
								Hủy bỏ
							</Button>
						</div>
						<div>
							<Button p_10_40 midnightBlue rounded_50 disable={selectedTemp === null} onClick={handleSave}>
								Xác nhận
							</Button>
						</div>
					</div>

					<div className={styles.close} onClick={handleClose}>
						<IoClose size={24} color='#23262F' />
					</div>
				</div>
			</Popup>
		</div>
	);
}

export default SelectSingle;
