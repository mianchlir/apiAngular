import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Parques} from '../models';
import {ParquesRepository} from './parques.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly parques: BelongsToAccessor<Parques, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource, @repository.getter('ParquesRepository') protected parquesRepositoryGetter: Getter<ParquesRepository>,
  ) {
    super(Ciudad, dataSource);
    this.parques = this.createBelongsToAccessorFor('parques', parquesRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
  }
}
