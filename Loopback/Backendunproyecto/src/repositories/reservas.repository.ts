import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Reservas, ReservasRelations} from '../models';

export class ReservasRepository extends DefaultCrudRepository<
  Reservas,
  typeof Reservas.prototype.id,
  ReservasRelations
> {
  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource,
  ) {
    super(Reservas, dataSource);
  }
}
