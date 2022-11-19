import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Ventas, VentasRelations} from '../models';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {
  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource,
  ) {
    super(Ventas, dataSource);
  }
}
