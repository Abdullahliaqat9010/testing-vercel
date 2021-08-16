export const generateSlug = (title: string): string => {
	return title?.toLowerCase().split(" ").slice(0, 60).join("-");
};
