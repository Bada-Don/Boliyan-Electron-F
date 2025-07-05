import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function InputSection({
  text,
  setText,
  onTransliterate,
  onKeyPress,
  isLoading,
  isDarkMode,
  textareaRef,
}) {
  return (
    <div
      className={`w-full px-4 py-3 rounded-2xl backdrop-blur-lg shadow-md transition-colors
        ${isDarkMode ? "bg-black/30 border border-white/10" : "bg-black/5 border border-black/10"}
      `}
    >
      <div className="flex items-end gap-3">
        <input
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Type something to transliterate..."
          rows={3}
          className={`w-full resize-none rounded-xl p-3 text-base outline-none transition-colors
            ${isDarkMode ? "bg-black/20 text-white placeholder-white/50" : "bg-white text-black placeholder-black/50"}
          `}
        />

        <button
          onClick={onTransliterate}
          disabled={!text.trim() || isLoading}
          className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center
            ${isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"}
            ${(!text.trim() || isLoading) && "opacity-50 cursor-not-allowed"}
          `}
        >
          <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
        </button>
      </div>
    </div>
  );
}
