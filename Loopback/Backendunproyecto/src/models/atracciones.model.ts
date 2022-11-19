import {Entity, model, property} from '@loopback/repository';

@model()
export class Atracciones extends Entity {
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
  nombres: string;

  @property({
    type: 'object',
    required: true,
  })
  imagen: object;

  @property({
    type: 'string',
    required: true,
  })
  id_zona: string;

  @property({
    type: 'number',
    required: true,
  })
  estatura_min: number;

  @property({
    type: 'buffer',
    required: true,
  })
  video: Buffer;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<Atracciones>) {
    super(data);
  }
}

export interface AtraccionesRelations {
  // describe navigational properties here
}

export type AtraccionesWithRelations = Atracciones & AtraccionesRelations;
