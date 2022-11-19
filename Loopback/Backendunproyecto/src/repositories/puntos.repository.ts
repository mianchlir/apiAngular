import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Puntos, PuntosRelations} from '../models';

export class PuntosRepository extends DefaultCrudRepository<
  Puntos,
  typeof Puntos.prototype.id,
  PuntosRelations
> {
  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource,
  ) {
    super(Puntos, dataSource);
  }
}
