import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Parques} from './parques.model';

@model()
export class Ciudad extends Entity {
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
  ciudad: string;

  @belongsTo(() => Parques)
  parquesId: string;
  //@property({
  //type: 'string',
  //required: true,
  //})
  //id_departamento: string;


  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
  
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
