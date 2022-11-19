import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Departamento, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
