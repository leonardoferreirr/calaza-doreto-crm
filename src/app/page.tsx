import { redirect } from "next/navigation";

export default function Home() {
  // Sem auth ainda no scaffold: leva direto pro Kanban de demonstração.
  redirect("/kanban");
}
