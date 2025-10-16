"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, Clock, MapPin, User, Mail, CheckCircle2, ArrowLeft } from "lucide-react"

// Mock event data - in a real app, this would come from a database
const mockEvent = {
  id: "1",
  name: "Conferencia de Tecnología 2025",
  date: "2025-03-15",
  time: "10:00",
  location: "Centro de Convenciones, Sala Principal",
  description:
    "Únete a nosotros para una jornada completa de charlas inspiradoras sobre las últimas tendencias en tecnología. Contaremos con expertos de la industria compartiendo sus conocimientos sobre IA, desarrollo web, y más.",
  imageUrl: "/technology-conference.png",
  organizerName: "María González",
}

export default function EventDetailsPage() {
  const [rsvpStatus, setRsvpStatus] = useState<string>("yes")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const rsvpData = {
      name: formData.get("name"),
      email: formData.get("email"),
      status: formData.get("status"),
      comment: formData.get("comment"),
    }

    console.log("[v0] RSVP data submitted:", rsvpData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setShowThankYou(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setShowThankYou(false)
    }, 5000)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Format time for display
  const formatTime = (timeString: string) => {
    return timeString
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Crear Nuevo Evento
            </Button>
          </Link>
        </div>

        {/* Event Details Card */}
        <Card className="border-border shadow-lg overflow-hidden">
          {/* Event Image */}
          {mockEvent.imageUrl && (
            <div className="w-full h-64 sm:h-80 overflow-hidden bg-muted">
              <img
                src={mockEvent.imageUrl || "/placeholder.svg"}
                alt={mockEvent.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <CardHeader className="space-y-3 pb-4">
            <CardTitle className="text-3xl sm:text-4xl text-balance">{mockEvent.name}</CardTitle>
            <div className="flex flex-col gap-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 flex-shrink-0" />
                <span className="text-base">{formatDate(mockEvent.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <span className="text-base">{formatTime(mockEvent.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="text-base">{mockEvent.location}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{mockEvent.description}</p>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>
                  Organizado por <span className="font-medium text-foreground">{mockEvent.organizerName}</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RSVP Form Card */}
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl">Confirmar Asistencia</CardTitle>
            <CardDescription className="text-base">Déjanos saber si podrás asistir al evento</CardDescription>
          </CardHeader>
          <CardContent>
            {showThankYou ? (
              <div className="py-12 text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">¡Gracias por tu confirmación!</h3>
                <p className="text-muted-foreground text-lg">Hemos recibido tu respuesta. Te esperamos en el evento.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nombre <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" name="name" placeholder="Tu nombre completo" required className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email <span className="text-muted-foreground text-xs">(opcional)</span>
                  </Label>
                  <Input id="email" name="email" type="email" placeholder="tu@email.com" className="h-11" />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    ¿Asistirás al evento? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    name="status"
                    value={rsvpStatus}
                    onValueChange={setRsvpStatus}
                    required
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="font-normal cursor-pointer">
                        Sí, asistiré
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="font-normal cursor-pointer">
                        No podré asistir
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe" className="font-normal cursor-pointer">
                        Tal vez
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment" className="text-sm font-medium">
                    Comentario <span className="text-muted-foreground text-xs">(opcional)</span>
                  </Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    placeholder="¿Tienes alguna pregunta o comentario?"
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
