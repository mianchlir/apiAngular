import {Entity, model, property, hasMany} from '@loopback/repository';
import {Planes} from './planes.model';
import {Atracciones} from './atracciones.model';

@model()
export class Zonas extends Entity {
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
  id_parques_list: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  color_hxdc: string[];

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Planes)
  planes: Planes[];

  @hasMany(() => Atracciones, {through: {model: () => Planes, keyTo: 'y'}})
  atracciones: Atracciones[];

  constructor(data?: Partial<Zonas>) {
    super(data);
  }
}

export interface ZonasRelations {
  // describe navigational properties here
}

export type ZonasWithRelations = Zonas & ZonasRelations;
