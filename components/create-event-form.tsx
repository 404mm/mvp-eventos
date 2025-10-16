"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, ImageIcon, User, Mail } from "lucide-react"

export function CreateEventForm() {
  const router = useRouter()
  const [imageOption, setImageOption] = useState<"url" | "upload">("url")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const eventData = {
      eventName: formData.get("eventName"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
      organizerName: formData.get("organizerName"),
      organizerEmail: formData.get("organizerEmail"),
    }

    console.log("[v0] Event data submitted:", eventData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const eventId = "1" // In a real app, this would come from the API response
    router.push(`/evento/${eventId}/admin`)
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl">Información del Evento</CardTitle>
        <CardDescription className="text-base">Todos los campos son obligatorios</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Details Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-sm font-medium">
                Nombre del Evento
              </Label>
              <Input
                id="eventName"
                name="eventName"
                placeholder="Ej: Conferencia de Tecnología 2025"
                required
                className="h-11"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fecha
                </Label>
                <Input id="date" name="date" type="date" required className="h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hora
                </Label>
                <Input id="time" name="time" type="time" required className="h-11" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Lugar
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="Ej: Centro de Convenciones, Sala Principal"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Descripción
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe tu evento, agenda, y detalles importantes..."
                required
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Imagen del Evento
              </Label>

              <div className="flex gap-2 mb-3">
                <Button
                  type="button"
                  variant={imageOption === "url" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageOption("url")}
                  className="flex-1"
                >
                  URL de Imagen
                </Button>
                <Button
                  type="button"
                  variant={imageOption === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageOption("upload")}
                  className="flex-1"
                >
                  Subir Archivo
                </Button>
              </div>

              {imageOption === "url" ? (
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  required
                  className="h-11"
                />
              ) : (
                <Input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  required
                  className="h-11 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              )}
            </div>
          </div>

          {/* Organizer Section */}
          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Información del Organizador</h3>

            <div className="space-y-2">
              <Label htmlFor="organizerName" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Nombre del Organizador
              </Label>
              <Input
                id="organizerName"
                name="organizerName"
                placeholder="Ej: María González"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizerEmail" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email del Organizador
              </Label>
              <Input
                id="organizerEmail"
                name="organizerEmail"
                type="email"
                placeholder="organizador@ejemplo.com"
                required
                className="h-11"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
            {isSubmitting ? "Creando Evento..." : "Crear Evento"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
