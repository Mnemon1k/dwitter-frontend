import RecordSkeleton from "./RecordSkeleton";

const RecordsFeedSkeleton = () => (
	<>
		<RecordSkeleton text/>
		<RecordSkeleton className={"mt-20"} image text/>
		<RecordSkeleton className={"mt-20"} text/>
		<RecordSkeleton className={"mt-20"} image text/>
	</>
);

export default RecordsFeedSkeleton;