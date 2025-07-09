import React, {useEffect, useRef, useState} from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import {PropsFilterMany} from './interfaces';
import styles from './FilterMany.module.scss';
import clsx from 'clsx';
import {removeVietnameseTones} from '~/common/funcs/optionConvert';
import {BiCheck} from 'react-icons/bi';
import {IoIosArrowDown} from 'react-icons/io';
import Button from '../Button';

function FilterMany<T extends string | number>({
	styleRounded = false,
	small = false,
	name,
	listOption,
	value,
	setValue,
}: PropsFilterMany<T>) {
	const inputSearchRef = useRef<HTMLInputElement>(null);

	const [open, setOpen] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const [listTerm, setListTerm] = useState<T[]>([]);

	const handleSelectClick = () => {
		if (inputSearchRef?.current) {
			setTimeout(() => {
				inputSearchRef.current?.focus();
			}, 0);
		}
	};

	useEffect(() => {
		if (open) setListTerm(value);
	}, [open]);

	useEffect(() => {
		if (listTerm.length == listOption.length) {
			setListTerm([]);
		}
	}, [listTerm]);

	return (
		<TippyHeadless
			maxWidth={'100%'}
			interactive
			visible={open}
			onClickOutside={() => setOpen(false)}
			placement='bottom-start'
			render={(attrs: any) => (
				<div className={clsx(styles.mainOption, {[styles.styleRounded]: styleRounded})}>
					<input
						ref={inputSearchRef}
						placeholder='Tìm kiếm...'
						className={styles.inputSearch}
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					<div className={styles.list_option}>
						<div
							className={clsx(styles.option, {
								[styles.option_active]: listTerm.length == 0 || listTerm.length == listOption.length,
							})}
							onClick={() => setListTerm([])}
						>
							<p>Tất cả</p>
							{(listTerm.length == 0 || listTerm.length == listOption.length) && (
								<div className={styles.icon_check}>
									<BiCheck fontSize={18} color='#5755FF' fontWeight={600} />
								</div>
							)}
						</div>
						{listOption
							?.filter((k) => removeVietnameseTones(k.name)?.includes(keyword ? removeVietnameseTones(keyword) : ''))
							?.map((v) => (
								<div
									key={v?.uuid}
									className={clsx(styles.option, {
										[styles.option_active]: listTerm.some((s) => s == v.uuid) && listTerm.length != listOption.length,
									})}
									onClick={() => {
										setListTerm((prev) =>
											prev.includes(v.uuid) ? prev.filter((f) => f !== v.uuid) : [...prev, v.uuid]
										);
									}}
								>
									<p>{v?.name}</p>
									{listTerm.some((s) => s == v.uuid) && listTerm.length != listOption.length ? (
										<div className={styles.icon_check}>
											<BiCheck fontSize={18} color='#5755FF' fontWeight={600} />
										</div>
									) : null}
								</div>
							))}
					</div>
					<div className={styles.control}>
						<Button
							p_10_24
							rounded_50
							grey
							onClick={() => {
								setOpen(false);
							}}
						>
							Hủy bỏ
						</Button>
						<Button
							p_10_24
							rounded_50
							midnightBlue
							onClick={() => {
								setValue(listTerm);
								setOpen(false);
							}}
						>
							Xác nhận
						</Button>
					</div>
				</div>
			)}
		>
			<div
				className={clsx(styles.container, {[styles.styleRounded]: styleRounded, [styles.active]: open, [styles.small]: small})}
				onClick={() => {
					setOpen(!open);
					handleSelectClick();
				}}
			>
				<div className={styles.value}>
					<p className={styles.name}>{name}:</p>
					<p className={styles.text}>
						{value.length == 0 || value.length == listOption.length
							? 'Tất cả'
							: `${value.length} ${name?.charAt(0).toLowerCase() + name.slice(1)}`}
					</p>
				</div>
				<div className={styles.icon_arrow}>
					<IoIosArrowDown size={16} />
				</div>
			</div>
		</TippyHeadless>
	);
}

export default FilterMany;
