const Loading = () => {
  return (
    <div className="flex justify-center gap-4 items-center h-screen bg-[#212121]">
        <div className="w-16 h-16 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="text-white font-semibold">Loading...</div>
    </div>
  )
}

export default Loading;
