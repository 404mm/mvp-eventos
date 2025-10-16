import { CreateEventForm } from "@/components/create-event-form"

export default function CrearEventoPage() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Crear Nuevo Evento
          </h1>
          <p className="mt-3 text-lg text-muted-foreground text-pretty">
            Completa la información para publicar tu evento y gestionar las confirmaciones de asistencia
          </p>
        </div>
        <CreateEventForm />
      </div>
    </main>
  )
}
