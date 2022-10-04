import {Card, CardContent, Skeleton} from "@mui/material";

const UserCardSkeleton = () => {
	return (
		<Card data-testid={"user-card-skeletor"} sx={{display: 'flex'}}>
			<Skeleton
				sx={{
					width: {xs: "100%", sm: 290, md: 360},
					height: {xs: "100%", sm: 290, md: 360}
				}}
			/>
			<CardContent className={"text-left card-skeleton"} sx={{flex: 1}}>
				<Skeleton animation={"pulse"} style={{marginBottom: 8}} height={30} width={"100%"}/>
				<Skeleton animation={"pulse"} style={{marginBottom: 8}} height={20} width={"70%"}/>
				<Skeleton animation={"pulse"} style={{marginBottom: 8}} height={20} width={"20%"}/>
			</CardContent>
		</Card>
	);
};

export default UserCardSkeleton;

