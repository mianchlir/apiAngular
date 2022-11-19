import {Entity, model, property} from '@loopback/repository';

@model()
export class Puntos extends Entity {
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
  tipo_servicio_list: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

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
    type: 'string',
    required: true,
  })
  cantidad: string;


  constructor(data?: Partial<Puntos>) {
    super(data);
  }
}

export interface PuntosRelations {
  // describe navigational properties here
}

export type PuntosWithRelations = Puntos & PuntosRelations;
