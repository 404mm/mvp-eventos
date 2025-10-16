"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

// Mock event data
const mockEvent = {
  id: "1",
  name: "Conferencia de Tecnología 2025",
  date: "2025-03-15",
  time: "10:00",
  location: "Centro de Convenciones, Sala Principal",
  description:
    "Únete a nosotros para una jornada completa de charlas inspiradoras sobre las últimas tendencias en tecnología. Contaremos con expertos de la industria compartiendo sus conocimientos sobre IA, desarrollo web, y más.",
}

// Mock RSVP data
const mockRsvps = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@email.com",
    status: "yes",
    comment: "¡Muy emocionado por asistir!",
    submittedAt: "2025-02-10",
  },
  {
    id: "2",
    name: "Ana Martínez",
    email: "ana@email.com",
    status: "yes",
    comment: "",
    submittedAt: "2025-02-11",
  },
  {
    id: "3",
    name: "Luis Fernández",
    email: "",
    status: "no",
    comment: "Tengo otro compromiso ese día",
    submittedAt: "2025-02-12",
  },
  {
    id: "4",
    name: "María López",
    email: "maria@email.com",
    status: "maybe",
    comment: "Depende de mi agenda",
    submittedAt: "2025-02-13",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    email: "pedro@email.com",
    status: "yes",
    comment: "",
    submittedAt: "2025-02-14",
  },
  {
    id: "6",
    name: "Laura García",
    email: "laura@email.com",
    status: "yes",
    comment: "¿Habrá certificado de asistencia?",
    submittedAt: "2025-02-15",
  },
  {
    id: "7",
    name: "Jorge Ramírez",
    email: "",
    status: "maybe",
    comment: "",
    submittedAt: "2025-02-16",
  },
  {
    id: "8",
    name: "Isabel Torres",
    email: "isabel@email.com",
    status: "no",
    comment: "No puedo asistir",
    submittedAt: "2025-02-17",
  },
]

export default function EventAdminPage() {
  // Calculate statistics
  const totalRsvps = mockRsvps.length
  const confirmedYes = mockRsvps.filter((rsvp) => rsvp.status === "yes").length
  const confirmedNo = mockRsvps.filter((rsvp) => rsvp.status === "no").length
  const confirmedMaybe = mockRsvps.filter((rsvp) => rsvp.status === "maybe").length
  const confirmationRate = totalRsvps > 0 ? Math.round((confirmedYes / totalRsvps) * 100) : 0

  const [copiedPublic, setCopiedPublic] = useState(false)
  const [copiedAdmin, setCopiedAdmin] = useState(false)

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

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "yes":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Sí
          </Badge>
        )
      case "no":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            No
          </Badge>
        )
      case "maybe":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
            <HelpCircle className="h-3 w-3 mr-1" />
            Tal vez
          </Badge>
        )
      default:
        return null
    }
  }

  const copyToClipboard = async (text: string, type: "public" | "admin") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "public") {
        setCopiedPublic(true)
        setTimeout(() => setCopiedPublic(false), 2000)
      } else {
        setCopiedAdmin(true)
        setTimeout(() => setCopiedAdmin(false), 2000)
      }
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const eventPublicUrl = typeof window !== "undefined" ? `${window.location.origin}/evento/1` : ""
  const eventAdminUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-balance mb-2">Administración de Evento</h1>
          <p className="text-muted-foreground text-lg">Gestiona las confirmaciones de asistencia</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-border shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Link Público del Evento
              </CardTitle>
              <CardDescription>Comparte este link con tus invitados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Input value={eventPublicUrl} readOnly className="font-mono text-sm" />
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(eventPublicUrl, "public")}>
                  {copiedPublic ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Link href="/evento/1" target="_blank">
                <Button variant="secondary" className="w-full">
                  Ver Página Pública
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Link de Administración
              </CardTitle>
              <CardDescription>Guarda este link para gestionar tu evento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Input value={eventAdminUrl} readOnly className="font-mono text-sm" />
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(eventAdminUrl, "admin")}>
                  {copiedAdmin ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Este link es privado. Solo tú debes tener acceso a esta página.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Event Information Card */}
        <Card className="border-border shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">{mockEvent.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{formatDate(mockEvent.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{mockEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{mockEvent.location}</span>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-muted-foreground leading-relaxed">{mockEvent.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wide">Total Respuestas</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-muted-foreground" />
                {totalRsvps}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wide">Confirmados</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                {confirmedYes}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wide">No Asisten</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-600" />
                {confirmedNo}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wide">Tasa Confirmación</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                {confirmationRate}%
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* RSVP List Card */}
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Lista de Invitados</CardTitle>
            <CardDescription className="text-base">
              {totalRsvps} {totalRsvps === 1 ? "persona ha respondido" : "personas han respondido"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Nombre</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Estado</TableHead>
                      <TableHead className="font-semibold">Comentario</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRsvps.map((rsvp) => (
                      <TableRow key={rsvp.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{rsvp.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {rsvp.email || <span className="italic text-xs">No proporcionado</span>}
                        </TableCell>
                        <TableCell>{getStatusBadge(rsvp.status)}</TableCell>
                        <TableCell className="max-w-xs">
                          {rsvp.comment ? (
                            <span className="text-sm text-muted-foreground">{rsvp.comment}</span>
                          ) : (
                            <span className="text-xs italic text-muted-foreground">Sin comentario</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
