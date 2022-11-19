import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Atracciones, AtraccionesRelations} from '../models';

export class AtraccionesRepository extends DefaultCrudRepository<
  Atracciones,
  typeof Atracciones.prototype.id,
  AtraccionesRelations
> {
  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource,
  ) {
    super(Atracciones, dataSource);
  }
}
