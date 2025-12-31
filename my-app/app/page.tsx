import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold text-blue-600">UCES Plataforma de Talento</p>
          <h1 className="text-4xl font-bold text-slate-900">Conecta con oportunidades y demuestra tu talento</h1>
          <p className="text-lg text-slate-600">
            Administra postulaciones, completa evaluaciones con temporizador y comparte evidencias de tu trabajo en una interfaz limpia y moderna.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Registrarme</Link>
            </Button>
          </div>
        </header>
      </div>
    </main>
  );
}
