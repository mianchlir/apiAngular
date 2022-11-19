import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
//import {Planes} from './planes.model';
import {Ventas} from './ventas.model';

@model()
export class Planes extends Entity {
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
  nombre: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  color_hxdc: string[];

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  id_atracciones: string;

  @property({
    type: 'string',
    required: true,
  })
  id_parque: string;

  @property({
    type: 'string',
    required: true,
  })
  id_zona: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_automatica: Date;

  @property({
    type: 'string',
  })
  zonasId?: string;

  @property({
    type: 'string',
  })
  y?: string;

  @hasOne(() => Planes)
  planes: Planes;

  @property({
    type: 'string',
  })
  planesId?: string;

  @hasMany(() => Ventas)
  ventas: Ventas[];

  constructor(data?: Partial<Planes>) {
    super(data);
  }
}

export interface PlanesRelations {
  // describe navigational properties here
}

export type PlanesWithRelations = Planes & PlanesRelations;
