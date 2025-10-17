// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({});

export const config = {
  matcher: ["/course/:path*", "/setting/:path*"], // chỉ bảo vệ 2 route này
};
