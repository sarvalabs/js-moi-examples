import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ cssOverride, size, color, loading }) => {
  return (
    <ClipLoader
      color={color || "#fbd77a"}
      loading={loading || false}
      cssOverride={
        cssOverride || {
          display: "block",
          margin: "0 auto",
          borderColor: "fbd77a",
        }
      }
      size={size || 18}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;