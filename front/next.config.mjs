/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/category/:path*",
        destination: "http://localhost:8080/category/:path*",
      },
      // {
      //     source: "/api/:path*",
      //     destination: "http://localhost:8080/api/:path*"
      // },
      {
        source: "/adpost/:path*",
        destination: "http://localhost:8080/adpost/:path*",
      },
      {
        source: "/user/:path*",
        destination: "http://localhost:8080/user/:path*",
      },
      {
        source: "/admin/category/:path*",
        destination: "http://localhost:8080/admin/category/:path*",
      },
      {
        source: "/admin/board/:path*",
        destination: "http://localhost:8080/admin/board/:path*",
      },
      {
        source: "/chat/:path*",
        destination: "http://localhost:8080/chat/:path*",
      },
      {
        source: "/town/:path*",
        destination: "http://localhost:8080/town/:path*",
      },
      {
        source: "/address/:path*",
        destination: "http://localhost:8080/address/:path*",
      },
      {
        source: "/searchlog/:path*",
        destination: "http://localhost:8080/searchlog/:path*",
      },
      {
        source: "/sub/:path*",
        destination: "http://localhost:8080/sub/:path*",
      },
      {
        source: "/ws-stomp/:path*",
        destination: "http://localhost:8080/ws-stomp/:path*",
      },
      {
        source: "/pub/:path*",
        destination: "http://localhost:8080/pub/:path*",
      },
      {
        source: "/qna/:path*",
        destination: "http://localhost:8080/qna/:path*",
      },
      {
        source: "/ad/:path*",
        destination: "http://localhost:8080/ad/:path*",
      },
      {
        source: "/alarm/:path*",
        destination: "http://localhost:8080/alarm/:path*"
      },
    ];
  },
};

export default nextConfig;
