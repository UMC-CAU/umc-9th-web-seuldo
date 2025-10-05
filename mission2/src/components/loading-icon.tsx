export const LoadingIcon = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="size-12 border-4 animate-spin rounded-full border-t-transparent"
        role = "status">
        <span className="sr-only">로딩 중...</span>
      </div>
    </div>
  );
};