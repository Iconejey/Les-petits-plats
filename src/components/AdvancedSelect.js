'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
	position: relative;
	width: 200px;
`;

const SelectHeader = styled.div`
	background-color: white;
	padding: 16px 20px;
	border-radius: 11px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: border-radius 0.2s;

	${props =>
		props.$is_open &&
		`
		border-radius: 11px 11px 0 0;
	`}
`;

const SelectTitle = styled.span`
	font-size: 16px;
	font-weight: 500;
	color: #1b1b1b;
`;

const ChevronIcon = styled.svg`
	width: 16px;
	height: 16px;
	transition: transform 0.2s;

	${props =>
		props.$is_open &&
		`
		transform: rotate(180deg);
	`}
`;

const DropdownContainer = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: white;
	border-radius: 0 0 11px 11px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	z-index: 100;
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.3s ease-out;

	${props =>
		props.$is_open &&
		`
		max-height: 400px;
	`}
`;

const SearchContainer = styled.div`
	padding: 8px;
	margin: 0 16px;
	border: 1px solid #c6c6c6;
	display: flex;
	align-items: center;
	gap: 8px;
`;

const SearchInput = styled.input`
	width: 124px;
	border: none;
	outline: none;
	font-size: 14px;
	color: #1b1b1b;
`;

const SearchIcon = styled.svg`
	width: 18px;
	height: 18px;
	flex-shrink: 0;
`;

const OptionsList = styled.div`
	max-height: 280px;
	overflow-y: auto;
	padding: 8px 0;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	&::-webkit-scrollbar-thumb {
		background: #c6c6c6;
		border-radius: 4px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: #7a7a7a;
	}
`;

const OptionItem = styled.div`
	padding: 12px 20px;
	cursor: pointer;
	font-size: 14px;
	color: #1b1b1b;
	transition: background-color 0.15s;

	&:hover {
		background-color: #ffd15b;
	}

	${props =>
		props.$is_selected &&
		`
		background-color: #ffd15b;
		font-weight: 500;
	`}
`;

const TagsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 12px;
`;

const FilterTag = styled.div`
	background-color: #ffd15b;
	padding: 16px 20px;
	border-radius: 11px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	color: #1b1b1b;
	cursor: pointer;
	transition: font-weight 0.15s;

	&:hover {
		font-weight: 700;
	}
`;

const CrossIcon = styled.svg`
	width: 12px;
	height: 12px;
	opacity: 0;
	transition: opacity 0.15s;
	flex-shrink: 0;

	${FilterTag}:hover & {
		opacity: 1;
	}
`;

export default function AdvancedSelect({ title, options, selected_values, onSelectionChange }) {
	const [is_open, setIsOpen] = useState(false);
	const [search_text, setSearchText] = useState('');
	const container_ref = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (container_ref.current && !container_ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const filtered_options = options.filter(option => option.toLowerCase().includes(search_text.toLowerCase()));

	function toggleSelect() {
		setIsOpen(!is_open);
		if (!is_open) {
			setSearchText('');
		}
	}

	function handleOptionClick(option) {
		if (selected_values.includes(option)) {
			onSelectionChange(selected_values.filter(v => v !== option));
		} else {
			onSelectionChange([...selected_values, option]);
		}
		setIsOpen(false);
		setSearchText('');
	}

	function removeTag(option) {
		onSelectionChange(selected_values.filter(v => v !== option));
	}

	return (
		<div>
			<SelectContainer ref={container_ref}>
				<SelectHeader onClick={toggleSelect} $is_open={is_open}>
					<SelectTitle>{title}</SelectTitle>
					<ChevronIcon $is_open={is_open} viewBox="0 0 16 16" fill="none">
						<path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</ChevronIcon>
				</SelectHeader>

				<DropdownContainer $is_open={is_open}>
					<SearchContainer>
						<SearchInput type="text" value={search_text} onChange={e => setSearchText(e.target.value)} onClick={e => e.stopPropagation()} />
						<SearchIcon viewBox="0 0 24 24" fill="none">
							<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#7a7a7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</SearchIcon>
					</SearchContainer>

					<OptionsList>
						{filtered_options.length > 0 ? (
							filtered_options.map((option, index) => (
								<OptionItem key={index} onClick={() => handleOptionClick(option)} $is_selected={selected_values.includes(option)}>
									{option}
								</OptionItem>
							))
						) : (
							<OptionItem style={{ color: '#7a7a7a', cursor: 'default' }}>Aucun résultat</OptionItem>
						)}
					</OptionsList>
				</DropdownContainer>
			</SelectContainer>

			{selected_values.length > 0 && (
				<TagsContainer>
					{selected_values.map((value, index) => (
						<FilterTag key={index} onClick={() => removeTag(value)}>
							{value}
							<CrossIcon viewBox="0 0 14 14" fill="none">
								<path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
							</CrossIcon>
						</FilterTag>
					))}
				</TagsContainer>
			)}
		</div>
	);
}
