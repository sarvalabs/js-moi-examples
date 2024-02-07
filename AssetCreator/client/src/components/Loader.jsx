import { ClipLoader } from "react-spinners";

const Loader = ({ loading, size, color }) => {
  return <ClipLoader loading={loading} size={size} color={color} />;
};

export default Loader;
