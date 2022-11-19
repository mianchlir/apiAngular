import {Entity, model, property} from '@loopback/repository';

@model()
export class Ventas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  taquilla: string;

  @property({
    type: 'number',
    required: true,
  })
  precio_venta: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

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
  planesId?: string;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
