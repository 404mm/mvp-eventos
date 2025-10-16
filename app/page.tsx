"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Plus, Settings, ExternalLink } from "lucide-react"

export default function Home() {
  // Mock data - in a real app, this would come from an API/database
  const events = [
    {
      id: "1",
      name: "Conferencia de Tecnología 2025",
      date: "2025-03-15",
      time: "10:00",
      location: "Centro de Convenciones",
      attendees: 45,
      confirmed: 32,
      image: "/technology-conference.png",
    },
    {
      id: "2",
      name: "Taller de Diseño UX",
      date: "2025-04-20",
      time: "14:00",
      location: "Espacio Creativo",
      attendees: 28,
      confirmed: 20,
      image: "/ux-design-workshop.png",
    },
  ]

  const hasEvents = events.length > 0

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">Mis Eventos</h1>
            <p className="mt-2 text-lg text-muted-foreground text-pretty">
              Gestiona tus eventos y revisa las confirmaciones de asistencia
            </p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/crear">
              <Plus className="h-5 w-5" />
              Crear Evento
            </Link>
          </Button>
        </div>

        {/* Events Grid or Empty State */}
        {hasEvents ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const confirmationRate = Math.round((event.confirmed / event.attendees) * 100)

              return (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-balance">{event.name}</CardTitle>
                    <CardDescription className="flex flex-col gap-1.5 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        - {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {event.confirmed} / {event.attendees} confirmados
                        </span>
                      </div>
                      <Badge variant={confirmationRate >= 70 ? "default" : "secondary"}>{confirmationRate}%</Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button asChild variant="default" className="flex-1 gap-2">
                        <Link href={`/evento/${event.id}/admin`}>
                          <Settings className="h-4 w-4" />
                          Administrar
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="icon">
                        <Link href={`/evento/${event.id}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Ver página pública</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          // Empty State
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No tienes eventos aún</h2>
              <p className="text-muted-foreground mb-6 max-w-md text-pretty">
                Crea tu primer evento para empezar a gestionar invitaciones y confirmaciones de asistencia
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link href="/crear">
                  <Plus className="h-5 w-5" />
                  Crear Mi Primer Evento
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
