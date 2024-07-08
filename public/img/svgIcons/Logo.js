import React from 'react';

import { Icon } from '@mui/material';

import LogoSVG from '../original/logo.svg';

/**
 * Logo Travel
 * @param {*} props
 * @return {Icon}
 */
export function Logo(props) {
	return (
		<Icon className={props.className}>
			<img src={LogoSVG} />
		</Icon>
	);
}
