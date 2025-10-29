import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RocketSeat IA" },
    { name: "description", content: "RocketSeat IA" },
  ];
}

export default function Home() {
  return (
    <h1 className="text-6xl font-bold text-center mt-48 text-purple-500">
      RocketSeat
    </h1>
  )
}
