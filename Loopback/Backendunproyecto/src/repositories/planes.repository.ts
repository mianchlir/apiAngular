import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Planes, PlanesRelations, Ventas} from '../models';
//import {PlanesRepository} from './planes.repository';
import {VentasRepository} from './ventas.repository';

export class PlanesRepository extends DefaultCrudRepository<
  Planes,
  typeof Planes.prototype.id,
  PlanesRelations
> {

  public readonly planes: HasOneRepositoryFactory<Planes, typeof Planes.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Ventas, typeof Planes.prototype.id>;

  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Planes, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.planes = this.createHasOneRepositoryFactoryFor('planes', planesRepositoryGetter);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
