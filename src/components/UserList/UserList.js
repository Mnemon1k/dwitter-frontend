import {useCallback, useEffect, useState} from "react";
import {getUsers} from "../../api/apiCalls";
import {Alert, List, Pagination} from "@mui/material";
import UserListItem from "./UserListItem";

const UserList = () => {
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(3);
	const [totalPages, setTotalPages] = useState(0);
	const [content, setContent] = useState([]);
	const [requestError, setRequestError] = useState(null);
	const [usersLoading, setUsersLoading] = useState(false);

	const loadUsers = useCallback(
		(pageToLoad = 0) => {
			setRequestError(null);
			setUsersLoading(true);
			getUsers({page: pageToLoad, size, totalPages})
				.then((response) => {
					setContent(response?.data?.content);
					setPage(response?.data?.number);
					setTotalPages(response?.data?.totalPages);
					setSize(response?.data?.size);
				})
				.catch((error) => {
					setRequestError(error?.response?.data?.message ||
						error?.response?.data ||
						error?.message ||
						"Server error while loading users"
					);
				})
				.finally(() => {
					setUsersLoading(false);
				});
		},
		[size, totalPages]
	);

	const handlePageChange = (event) => {
		let clickedPage = event.target.innerText;
		if (clickedPage !== undefined && parseInt(clickedPage) !== page + 1) {
			loadUsers(clickedPage - 1);
			return;
		}

		if (!event.target.closest("li").nextSibling) {
			loadUsers(page + 1);
			return;
		}
		if (!event.target.closest("li").previousSibling) {
			loadUsers(page - 1);
		}
	}

	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	return (
		<div className={"text-center"}>
			<h1>Users</h1>
			<div>
				<List dense={true}>
					{
						content.map(user => (
							<UserListItem key={user.id} user={user}/>
						))
					}
				</List>
				<Pagination
					onChange={handlePageChange}
					count={totalPages}
					page={page + 1}
					color="primary"
					disabled={usersLoading}
				/>
				{
					requestError
					&&
					<Alert severity="error">{requestError}</Alert>
				}
			</div>
		</div>
	);
};

export default UserList;