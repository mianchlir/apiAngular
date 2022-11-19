import {Entity, model, property} from '@loopback/repository';

@model()
export class Parques extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'object',
    required: true,
  })
  imagen: object;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_visitantes: string;

  @property({
    type: 'object',
    required: true,
  })
  mapa: object;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<Parques>) {
    super(data);
  }
}

export interface ParquesRelations {
  // describe navigational properties here
}

export type ParquesWithRelations = Parques & ParquesRelations;
