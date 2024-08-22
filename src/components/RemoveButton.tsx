type Props = {
  onRemove: (e: React.MouseEvent) => void;
  text: string;
  disabled?: boolean;
};

const RemoveButton = ({ onRemove, text, disabled }: Props) => {
  return (
    <button
      type="button"
      className="bg-red-500 py-1 px-2 rounded hover:bg-red-700 text-white text-xs sm:text-sm disabled:bg-red-200"
      onClick={onRemove}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default RemoveButton;
