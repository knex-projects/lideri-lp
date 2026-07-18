
export { default } from "next-auth/middleware";

export const config = {
  
  matcher: [

    "/dashboard", 
    "/editor", 
    "/editor/:path*", 
    "/posts", 
    "/midias", 
  ],
};