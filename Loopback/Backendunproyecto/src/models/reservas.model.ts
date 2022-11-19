import {Entity, model, property} from '@loopback/repository';

@model()
export class Reservas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_compra: string;

  @property({
    type: 'string',
    required: true,
  })
  id_reserva: string;

  @property({
    type: 'string',
    required: true,
  })
  id_persona: string;

  @property({
    type: 'string',
    required: true,
  })
  id_parques: string;

  @property({
    type: 'string',
    required: true,
  })
  id_tiquete: string;

  @property({
    type: 'string',
    required: true,
  })
  taquilla: string;

  @property({
    type: 'string',
    required: true,
  })
  id_planes: string;

  @property({
    type: 'number',
    required: true,
  })
  precio_venta: number;

  @property({
    type: 'string',
    required: true,
  })
  fecha_reserva: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado_tiquete: boolean;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
  })
  personaId?: string;

  @property({
    type: 'string',
  })
  planesId?: string;

  constructor(data?: Partial<Reservas>) {
    super(data);
  }
}

export interface ReservasRelations {
  // describe navigational properties here
}

export type ReservasWithRelations = Reservas & ReservasRelations;
