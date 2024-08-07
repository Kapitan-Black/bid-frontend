type Props = {
    onRemove: (e: React.MouseEvent) => void;
    text: string;
};

const RemoveButton = ({onRemove, text}: Props) => {
    return (
      <button
        type="button"
        className="bg-red-500 py-1 px-2 rounded hover:bg-red-700 text-white text-xs sm:text-sm"
        onClick={onRemove}
      >
        {text}
      </button>
    );
}

export default RemoveButton;