interface LoaderButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoaderButton({ onClick, loading }: LoaderButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
    >
      {loading ? "Identifying..." : "Identify Plant"}
    </button>
  );
}
