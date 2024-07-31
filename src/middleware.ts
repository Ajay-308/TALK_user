import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/"],
});

//testing cicd
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
