import {BottomNavigation, BottomNavigationAction} from "@mui/material";

const LoadPostsButton = ({newPostsCount, ...props}) => {
	const text = newPostsCount > 1 ? `There are ${newPostsCount} new posts` : "There is 1 new post";

	return newPostsCount > 0 && (
		<>
			<BottomNavigation {...props} showLabels
							  sx={{width: "100%"}}>
				<BottomNavigationAction className={"btn-fullwidth"}
										label={text}/>
			</BottomNavigation>
		</>
	);
};

export default LoadPostsButton;
