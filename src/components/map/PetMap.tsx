import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet'

/** Marcador con forma de placa, sin depender de las imágenes por defecto de Leaflet. */
const placaIcon = L.divIcon({
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  html: `<span style="display:grid;place-items:center;width:36px;height:36px;border-radius:9999px;background:#6A3EA1;border:3px solid #fff;box-shadow:0 6px 16px -4px rgb(78 42 126 / .5)">
    <span style="width:10px;height:10px;border-radius:9999px;background:#C4E38A"></span>
  </span>`,
})

type PetMapProps = {
  lat: number
  lng: number
  label: string
  /** Radio del área aproximada en metros. */
  radius?: number
  className?: string
}

/** Mapa con la zona aproximada donde está la mascota. */
export default function PetMap({ lat, lng, label, radius = 600, className }: PetMapProps) {
  return (
    <div className={className} role="region" aria-label={`Mapa: ${label}`}>
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom={false}
        className="size-full"
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={[lat, lng]}
          radius={radius}
          pathOptions={{ color: '#6A3EA1', weight: 2, fillColor: '#6A3EA1', fillOpacity: 0.12 }}
        />
        <Marker position={[lat, lng]} icon={placaIcon} keyboard={false} />
      </MapContainer>
    </div>
  )
}
