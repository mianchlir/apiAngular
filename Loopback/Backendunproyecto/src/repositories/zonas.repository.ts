import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MomgodbDataSource} from '../datasources';
import {Zonas, ZonasRelations, Planes, Atracciones} from '../models';
import {PlanesRepository} from './planes.repository';
import {AtraccionesRepository} from './atracciones.repository';

export class ZonasRepository extends DefaultCrudRepository<
  Zonas,
  typeof Zonas.prototype.id,
  ZonasRelations
> {

  public readonly planes: HasManyRepositoryFactory<Planes, typeof Zonas.prototype.id>;

  public readonly atracciones: HasManyThroughRepositoryFactory<Atracciones, typeof Atracciones.prototype.id,
          Planes,
          typeof Zonas.prototype.id
        >;

  constructor(
    @inject('datasources.momgodb') dataSource: MomgodbDataSource, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>, @repository.getter('AtraccionesRepository') protected atraccionesRepositoryGetter: Getter<AtraccionesRepository>,
  ) {
    super(Zonas, dataSource);
    this.atracciones = this.createHasManyThroughRepositoryFactoryFor('atracciones', atraccionesRepositoryGetter, planesRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
