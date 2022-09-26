import {useEffect, useState} from "react";
import {getUsers} from "../../api/apiCalls";

const UserList = () => {
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(3);
	const [content, setContent] = useState([]);


	useEffect(() => {
		getUsers({page, size})
			.then((response) => {
				setContent(response?.data?.content);
				setPage(response?.data?.page);
				setSize(response?.data?.size);
			})
			.catch((error) => {
			});

	}, [page, size]);


	return (
		<div>
			<h3>Users</h3>
			<div data-testid={"user-group"}>
				{
					content.map(user => (
						<div key={user.id}>
							name: {user.username}
						</div>
					))
				}
			</div>
		</div>
	);
};

export default UserList;