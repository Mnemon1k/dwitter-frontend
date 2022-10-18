import React from 'react';
import Box from "@mui/material/Box";
import Skeleton from '@mui/material/Skeleton'
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";

const RecordSkeleton = ({image, text, ...props}) => {
	return (
		<div {...props}>
			<Box sx={{display: 'flex', alignItems: 'center'}}>
				<Box sx={{margin: 1}}>
					<Skeleton variant="circular">
						<Avatar/>
					</Skeleton>
				</Box>
				<Box sx={{width: '100%'}}>
					<Skeleton width="100%">
						<Typography>.</Typography>
					</Skeleton>
				</Box>
			</Box>
			{
				image &&
				<Skeleton variant="rectangular" width="100%">
					<div style={{paddingTop: '27%'}}/>
				</Skeleton>
			}
			{
				text &&
				<>
					<Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
					<Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
					<Skeleton animation="wave" height={10} width="80%"/>
				</>
			}
		</div>
	);
};

export default RecordSkeleton;
