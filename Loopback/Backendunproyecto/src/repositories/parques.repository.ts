import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Parques, ParquesRelations} from '../models';

export class ParquesRepository extends DefaultCrudRepository<
  Parques,
  typeof Parques.prototype.id,
  ParquesRelations
> {
  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource,
  ) {
    super(Parques, dataSource);
  }
}
